import * as authService from "../service/authService.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const register = asyncHandler(async (req, res) => {
  const profileImage = req.file?.path || "";

  const location = req.body.location;

  const user = await authService.createUser({
    ...req.body,
    profileImage,
    location,
  });

  res.status(201).json(new ApiResponse(201, user, "User Created"));
});

export const login = asyncHandler(async (req, res) => {
  const { user, token } = await authService.loginUser(req.body, res);
  res
    .status(200)
    .json(new ApiResponse(200, { user, token }, "Login Successful"));
});

export const getProfile = asyncHandler(async (req, res) => {
  const user = await authService.getUserProfile(req.user.id);
  res.status(200).json(new ApiResponse(200, user, "User Profile Retrieved"));
});

export const updateProfile = asyncHandler(async (req, res) => {
  const profileImage = req.file?.path;

  const location = req.body.location
    ? JSON.parse(req.body.location)
    : undefined;

  const updateData = {
    ...req.body,
    ...(profileImage && { profileImage }),
    ...(location && { location }),
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
