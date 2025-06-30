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


// import User from '../models/User.js';
// import jwt from 'jsonwebtoken';
// import ApiError from '../utils/ApiError.js';
// import Pharmacy from '../models/Pharmacy.js';
// import Customer from '../models/Customer.js';

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";
const JWT_REFRESH = process.env.JWT_REFRESH || "your_refresh_key";

// export const createUser = async ({
//   name,
//   email,
//   password,
//   role,
//   profileImage,
//   address,
//   phone,
//   licenseNumber,
//   operatingHours,
//   is24Hours,
//   location,
//   deliveryAddresses,
//   favoritePharmacies,

//   location
// }) => {
//   const existing = await User.findOne({ email });
//   if (existing) throw new ApiError(400, "User already exists");

//   let newUser;

//   if (role === "pharmacy") {
//     if (!address || !phone || !location?.coordinates) {
//       throw new ApiError(
//         400,
//         "Pharmacy must include address, phone, and location"
//       );
//     }

//     newUser = new Pharmacy({
//       name,
//       email,
//       password,
//       role,
//       profileImage,
//       address,
//       phone,
//       licenseNumber,
//       operatingHours,
//       is24Hours,
//       location,
//     });
//   } else if (role === "customer") {
//     newUser = new Customer({
//       name,
//       email,
//       password,
//       role,
//       profileImage,
//       deliveryAddresses,
//       favoritePharmacies,
//     });
//   } else {
//     throw new ApiError(400, "Invalid role");
//   }

//   await newUser.save();
//   return newUser;
// };

// export const loginUser = async ({ email, password }, res) => {

//   const user = new User({
//     name,
//     email,
//     password,
//     role,
//     profileImage,
//     ...(role === 'pharmacy' && { address, phone, location , licenseNumber})

//   });

//   await user.save();
//   return user;


// };


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
  favoritePharmacies = [] // Customer-specific (optional)
}) => {
  const existing = await User.findOne({ email });
  if (existing) throw new ApiError(400, 'User already exists');

  // Validate role-specific fields
  if (role === 'pharmacy' && (!address || !phone || !location?.coordinates)) {
    throw new ApiError(400, 'Pharmacy must include address, phone, and location');
  }

  let user;
  let newUser;
  console.log("This Is The Address", address);
  console.log("This Is The Phone", phone);

  // Parse the location if it's a string
  if (typeof location === "string") {
    try {
      location = JSON.parse(location); // Parse the location string to an object
    } catch (error) {
      throw new ApiError(400, "Invalid location format");
    }
  }

  console.log("This Is The Location", location); // This should now be an object

  // Ensure location is valid if role is "pharmacy"
  if (role === "pharmacy") {
    if (
      !address ||
      !phone ||
      !location ||
      !location.coordinates ||
      location.coordinates.length !== 2
    ) {
      throw new ApiError(
        400,
        "Pharmacy must include address, phone, and valid location (coordinates)"
      );
    }

  // Create the correct discriminator model
  if (role === 'pharmacy') {
    user = new Pharmacy({
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
      location: {
        type: "Point",
        coordinates: location.coordinates, // Ensure coordinates are passed correctly
      },
    });
  } else {
    user = new Customer({
      name,
      email,
      password,
      role,
      profileImage,
      deliveryAddresses,
      favoritePharmacies
    });
  }

  await user.save();
  return user;
};

export const loginUser = async ({ email, password },res) => {
  const user = await User.findOne({ email });
  console.log("This Is The User", user);
export const loginUser = async ({ email, password }, res) => {
  // 1. Find user and explicitly select password for comparison
  const user = await User.findOne({ email })
    .select("+password")
    .populate({
      path: "notifications",
      options: { sort: { createdAt: -1 } }, // Newest first
    });

  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, "Invalid credentials");
  }

  const notifications = await Notification.find({
    $or: [{ customer: user._id }, { pharmacy: user._id }],
  }).sort({ createdAt: -1 });

  console.log("This Is The User With Notifications", user);
  console.log("This Is The Notificaations Of The User", notifications);
  // 2. Verify notifications were populated
  // console.log("User with notifications:", {
  //   _id: user._id,
  //   notificationCount: user.notifications?.length,
  //   sampleNotification: user.notifications?.[0],
  // });

  // 3. Generate tokens
  const access_Token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  const refresh_Token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_REFRESH,
    { expiresIn: "7d" }
  );

  // 4. Set cookie
  res.cookie("refreshToken", refresh_Token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  // 5. Remove sensitive data before returning
  const userWithoutPassword = user.toObject();
  delete userWithoutPassword.password;

  return {
    user: userWithoutPassword,
    access_Token,
    notifications, // Ensure array is returned
  };
};

export const getUserProfile = async (userId) => {
  console.log("This Is The UserId In GetUser Function", userId);

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
