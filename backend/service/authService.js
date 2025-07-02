import User from "../models/User.js";
import Pharmacy from "../models/Pharmacy.js";
import Customer from "../models/Customer.js";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import Order from "../models/Order.js";
import Review from "../models/Review.js";
import dotenv from "dotenv";
import Notification from "../models/Notification.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";
const JWT_REFRESH = process.env.JWT_REFRESH || "your_refresh_key";

// Create User - Handles both pharmacy and customer creation
export const createUser = async ({
  name,
  email,
  password,
  role,
  profileImage,
  address,
  phone,
  licenseNumber,
  location,
  deliveryAddresses = [], // Customer-specific (optional)
  favoritePharmacies = [], // Customer-specific (optional)
}) => {
  // Check if the email already exists
  const existing = await User.findOne({ email });
  if (existing) throw new ApiError(400, "User already exists");

  // Validate role-specific fields for pharmacies
  if (role === "pharmacy" && (!address || !phone || !location?.coordinates)) {
    throw new ApiError(
      400,
      "Pharmacy must include address, phone, and location"
    );
  }

  // Parse the location if it's a string
  if (typeof location === "string") {
    try {
      location = JSON.parse(location); // Parse the location string to an object
    } catch (error) {
      throw new ApiError(400, "Invalid location format");
    }
  }

  // Validate location for pharmacy role
  if (
    role === "pharmacy" &&
    (!location || !location.coordinates || location.coordinates.length !== 2)
  ) {
    throw new ApiError(
      400,
      "Pharmacy must include a valid location with coordinates"
    );
  }

  // Create user depending on the role
  let user;
  if (role === "pharmacy") {
    user = new Pharmacy({
      name,
      email,
      password,
      role,
      profileImage,
      address,
      phone,
      licenseNumber,
      location: {
        type: "Point",
        coordinates: location.coordinates,
      },
    });
  } else if (role === "customer") {
    user = new Customer({
      name,
      email,
      password,
      role,
      profileImage,
      deliveryAddresses,
      favoritePharmacies,
    });
  } else {
    throw new ApiError(400, "Invalid role");
  }

  await user.save();
  return user;
};

// Login User - Authenticates user and provides tokens
export const loginUser = async ({ email, password }, res) => {
  // 1. Find user and explicitly select password for comparison
  const user = await User.findOne({ email })
    .select("+password")
    .populate({
      path: "notifications",
      options: { sort: { createdAt: -1 } }, // Newest notifications first
    });

  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, "Invalid credentials");
  }

  console.log("This Is The User", user);

  // 2. Fetch notifications for the user
  const notifications = await Notification.find({
    $or: [{ customer: user._id }, { pharmacy: user._id }],
  }).sort({ createdAt: -1 });

  // 3. Generate tokens
  const access_Token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: "1d",
  });
  const refresh_Token = jwt.sign(
    { id: user._id, role: user.role },
    JWT_REFRESH,
    { expiresIn: "7d" }
  );

  // 4. Set cookie for the refresh token
  res.cookie("refreshToken", refresh_Token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Ensure cookie is secure in production
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  // 5. Remove sensitive data (password) from the user object before sending response
  const userWithoutPassword = user.toObject();
  delete userWithoutPassword.password;

  return {
    user: userWithoutPassword,
    access_Token,
    notifications,
  };
};

// Get User Profile - Retrieves the profile data and associated orders/reviews
export const getUserProfile = async (userId) => {
  const user = await User.findById(userId).select("-password");
  if (!user) throw new ApiError(404, "User not found");

  let orders = [];
  let reviews = [];

  // Fetch orders and reviews based on user role
  if (user.role === "customer") {
    orders = await Order.find({ customer: userId })
      .populate("pharmacy", "name email address")
      .sort({ createdAt: -1 });
    reviews = await Review.find({ customer: userId })
      .populate("pharmacy", "name email address")
      .sort({ createdAt: -1 });
  } else if (user.role === "pharmacy") {
    orders = await Order.find({ pharmacy: userId })
      .populate("customer", "name email")
      .sort({ createdAt: -1 });
    reviews = await Review.find({ pharmacy: userId })
      .populate("customer", "name email")
      .sort({ createdAt: -1 });
  }

  // Combine user data with orders and reviews
  const userProfile = {
    ...user.toObject(),
    orders,
    reviews,
  };

  return userProfile;
};

// Update User - Update user data
export const updateUser = async (userId, updateData) => {
  const user = await User.findByIdAndUpdate({ _id: userId }, updateData, {
    new: true,
  });
  if (!user) throw new ApiError(404, "User not found");
  return user;
};

// Refresh Access Token - Uses refresh token to generate a new access token
export const refreshAccessToken = async (refreshToken) => {
  const decoded = jwt.verify(refreshToken, JWT_REFRESH);
  const user = await User.findById(decoded.id);
  if (!user) throw new ApiError(404, "User not found");

  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "1d" }
  );
};

// Get Nearby Pharmacies - Finds pharmacies near the user's location
export const getNearbyPharmacies = async ({
  latitude,
  longitude,
  maxDistance = 5000,
}) => {
  if (!latitude || !longitude)
    throw new ApiError(400, "Latitude and longitude are required");

  console.log("This Is Longitude", longitude, "This Is Latitude", latitude);

  const pharmacies = await Pharmacy.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [parseFloat(longitude), parseFloat(latitude)],
        },
        $maxDistance: maxDistance,
      },
    },
  }).select("-password");

  console.log("This Is Pharmacies In Service", pharmacies);

  return pharmacies;
};
