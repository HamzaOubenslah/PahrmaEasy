import User from "../models/User.js";
import Pharmacy from "../models/Pharmacy.js";
import Customer from "../models/Customer.js";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import Order from "../models/Order.js";
import Review from "../models/Review.js";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";
const JWT_REFRESH = process.env.JWT_REFRESH || "your_refresh_key";

export const createUser = async ({
  name,
  email,
  password,
  role,
  profileImage,
  address,
  phone,
  licenseNumber,
  operatingHours,
  is24Hours,
  location,
  deliveryAddresses,
  favoritePharmacies,
}) => {
  const existing = await User.findOne({ email });
  if (existing) throw new ApiError(400, "User already exists");

  let newUser;

  if (role === "pharmacy") {
    if (!address || !phone || !location?.coordinates) {
      throw new ApiError(
        400,
        "Pharmacy must include address, phone, and location"
      );
    }

    newUser = new Pharmacy({
      name,
      email,
      password,
      role,
      profileImage,
      address,
      phone,
      licenseNumber,
      operatingHours,
      is24Hours,
      location,
    });
  } else if (role === "customer") {
    newUser = new Customer({
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

  await newUser.save();
  return newUser;
};

export const loginUser = async ({ email, password }, res) => {
  const user = await User.findOne({ email });
  console.log("This Is The User", user);
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, "Invalid credentials");
  }

  const access_Token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: "1d",
  });

  const refresh_Token = jwt.sign(
    { id: user._id, role: user.role },
    JWT_REFRESH,
    {
      expiresIn: "7d",
    }
  );

  res.cookie("refreshToken", refresh_Token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // send only over HTTPS in production
    sameSite: "Strict", // or "Lax" depending on your use-case
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return { user, access_Token };
};

export const getUserProfile = async (userId) => {
  const user = await User.findById(userId).select("-password");
  if (!user) throw new ApiError(404, "User not found");

  let orders = [];
  let reviews = [];

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

  const userProfile = {
    ...user.toObject(),
    orders,
    reviews,
  };

  return userProfile;
};

export const updateUser = async (userId, updateData) => {
  const user = await User.findByIdAndUpdate({ _id: userId }, updateData, {
    new: true,
  });
  if (!user) throw new ApiError(404, "User not found");
  return user;
};

export const refreshAccessToken = async (refreshToken) => {
  const decoded = jwt.verify(refreshToken, JWT_REFRESH);
  const user = await User.findById(decoded.id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "1d" }
  );
};

export const getNearbyPharmacies = async ({
  latitude,
  longitude,
  maxDistance = 5000,
}) => {
  if (!latitude || !longitude) {
    throw new ApiError(400, "Latitude and longitude are required");
  }

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

  return pharmacies;
};
