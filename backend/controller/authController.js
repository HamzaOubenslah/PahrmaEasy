import * as authService from "../service/authService.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { getNearbyPharmacies } from "../service/authService.js";

export const register = asyncHandler(async (req, res) => {
  const base64Image = `data:${
    req.file.mimetype
  };base64,${req.file.buffer.toString("base64")}`;

  console.log("This Is The req.file In AuthController", req.file);

  // const location = req.body.location;

  // const location = req.body.location
  //   ? JSON.parse(req.body.location)  // assuming location sent as stringified object
  //   : undefined;

  const location = req.body.location || undefined;

  const user = await authService.createUser({
    ...req.body,
    profileImage: base64Image,
    location,
  });

  res.status(201).json(new ApiResponse(201, user, "User Created"));
});

export const login = asyncHandler(async (req, res) => {
  const { user, access_Token, notifications } = await authService.loginUser(
    req.body,
    res
  );
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user, access_Token, notifications },
        "Login Successful"
      )
    );
});

export const getProfile = asyncHandler(async (req, res) => {
  const user = await authService.getUserProfile(req.user.id);
  res.status(200).json(new ApiResponse(200, user, "User Profile Retrieved"));
});

export const updateProfile = asyncHandler(async (req, res) => {
  // Check if a file was uploaded
  console.log("This Is The Req.file", req.file);
  let profileImageBase64 = null;
  if (req.file) {
    // Convert buffer to base64 string with MIME type
    const base64Image = `data:${
      req.file.mimetype
    };base64,${req.file.buffer.toString("base64")}`;
    profileImageBase64 = base64Image;
  }

  const updateData = {
    ...req.body,
    ...(profileImageBase64 && { profileImage: profileImageBase64 }),
  };

  const user = await authService.updateUser(req.user.id, updateData);
  res.status(200).json(new ApiResponse(200, user, "Profile Updated"));
});

export const handleRefreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;
  console.log(
    "This Is The Refresh Token In RefreshToken Controller",
    refreshToken
  );

  if (!refreshToken) {
    return res.status(400).json("No refresh token provided");
  }

  const newAccessToken = await authService.refreshAccessToken(refreshToken);

  res
    .status(200)
    .json(new ApiResponse(200, newAccessToken, "Access Token Refreshed"));
});

export const findNearbyPharmacies = asyncHandler(async (req, res) => {
  const { lat, lng, maxDistance } = req.query;

  const pharmacies = await getNearbyPharmacies({
    latitude: lat,
    longitude: lng,
    maxDistance: maxDistance ? parseInt(maxDistance) : 5000, // optional
  });
  console.log("This Is Pharmaies", pharmacies);

  res
    .status(200)
    .json(
      new ApiResponse(200, pharmacies, "Nearby pharmacies fetched successfully")
    );
});
