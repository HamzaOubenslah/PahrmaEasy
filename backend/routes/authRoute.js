import express from "express";
import * as authController from "../controller/authController.js";
import VerifyToken from "../middleware/VerifyToken.js";
import upload from "../config/multer.js";

const router = express.Router();

// Public routes
router.post(
  "/register",
  upload.single("profileImage"),
  authController.register
);
router.post("/login", authController.login);
router.post("/refresh-token", authController.handleRefreshToken);

// Protected routes (require authentication)
router.get("/profile",VerifyToken, authController.getProfile);
router.post(
  "/profile/edit",

  VerifyToken,
  upload.single("profileImage"),
  authController.updateProfile
);

router.get("/nearby", authController.findNearbyPharmacies);

export default router;
