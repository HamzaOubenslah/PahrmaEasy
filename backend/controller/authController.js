import * as authService from "../service/authService.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const register = asyncHandler(async (req, res) => {
  const profileImage = req.file.path;
  const user = await authService.createUser({ ...req.body, profileImage });
  res.status(201).json(new ApiResponse(200, user, "User Created"));
});

export const login = asyncHandler(async (req, res) => {
  const { user, token } = await authService.loginUser(req.body);
  res.status(200).json(new ApiResponse(200, {user,token}, "Login Successfully"));
});

export const getProfile = asyncHandler(async (req, res) => {
  const user = await authService.getUserProfile(req.user.id);
  res.status(200).json(new ApiResponse(200, user, "Get User Succssfully"));
});

export const updateProfile = asyncHandler(async (req, res) => {
  const profileImage = req.file.path;
  const updateData = {
    ...req.body,
    ...(profileImage && { profileImage }),
  };
  const user = await authService.updateUser(req.user.id, updateData);
  res.status(200).json(new ApiResponse(200, user, "User Updated Successfully"));
});

export const handleRefreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json("There Is No RefreshToken");
  }

  const newAccessToken = await authService.refreshAccessToken(refreshToken);

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        newAccessToken,
        "Refresh Token Generated successfully"
      )
    );
});
