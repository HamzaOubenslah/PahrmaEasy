import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import pharmacyService from "../service/pharmacyService.js";
import ApiError from "../utils/ApiError.js";
import Category from "../models/Category.js";
import { sendNotification } from "../service/socketService.js";

// Orders
export const getPharmacyOrders = asyncHandler(async (req, res) => {
  console.log("Pharmacy ID from token:", req.user.id);
  const orders = await pharmacyService.getOrdersByPharmacy(req.user.id);
  console.log(orders);

  if (!orders) {
    throw new ApiError(404, "No orders found for this pharmacy");
  }

  res
    .status(200)
    .json(new ApiResponse(200, orders, "Orders retrieved successfully"));
});

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  console.log("Pharmacy ID (req.user.id):", req.user.id); // ✅ Check logged-in pharmacy
  console.log("Order ID:", orderId); // ✅ Check order ID

  const order = await pharmacyService.changeOrderStatus(
    orderId,
    status,
    req.user.id
  );
  if (!order) {
    throw new ApiError(404, "Order not found");
  }
  res
    .status(200)
    .json(new ApiResponse(200, order, "Order status updated successfully"));
});

// Profile
export const getPharmacyProfile = asyncHandler(async (req, res) => {
  const profile = await pharmacyService.getPharmacyProfile(req.user.id);

  if (!profile) {
    throw new ApiError(404, "Pharmacy profile not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, profile, "Profile retrieved successfully"));
});

export const updatePharmacyProfile = asyncHandler(async (req, res) => {
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

  const pharmacy = await pharmacyService.updatePharmacyProfile(
    req.user.id,
    updateData
  );
  if (!pharmacy) {
    throw new ApiError(400, "Failed to update pharmacy profile");
  }

  res
    .status(200)
    .json(new ApiResponse(200, pharmacy, "Profile updated successfully"));
});

export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  await pharmacyService.changePharmacyPassword(
    req.user.id,
    currentPassword,
    newPassword
  );
  res
    .status(200)
    .json(new ApiResponse(200, null, "Password changed successfully"));
});

export const getPharmacyMedicines = asyncHandler(async (req, res) => {
  const medicines = await pharmacyService.getMedicinesByPharmacy(req.user.id);

  if (!medicines) {
    throw new ApiError(404, "No medicines found for this pharmacy");
  }

  res
    .status(200)
    .json(new ApiResponse(200, medicines, "Medicines retrieved successfully"));
});

// Medicines Management
export const createMedicine = asyncHandler(async (req, res) => {
  const medicine = await pharmacyService.addMedicine(req.body, req.user.id);
  if (!medicine) {
    throw new ApiError(400, "Failed to create medicine");
  }
  res
    .status(201)
    .json(new ApiResponse(201, medicine, "Medicine created successfully"));
});

export const updateMedicine = asyncHandler(async (req, res) => {
  const { medicineId } = req.params;

  const medicine = await pharmacyService.editMedicine(
    medicineId,
    req.body,
    req.user.id
  );
  if (!medicine) {
    throw new ApiError(404, "Medicine not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, medicine, "Medicine updated successfully"));
});

export const removeMedicine = asyncHandler(async (req, res) => {
  const { medicineId } = req.params;

  const result = await pharmacyService.deleteMedicine(medicineId, req.user.id);
  if (!result) {
    throw new ApiError(404, "Medicine not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, null, "Medicine deleted successfully"));
});

// Reviews
export const getPharmacyReviews = asyncHandler(async (req, res) => {
  console.log("Pharmacy ID from token:", req.user.id);
  const reviews = await pharmacyService.getPharmacyReviews(req.user.id);

  if (!reviews) {
    throw new ApiError(404, "No reviews found for this pharmacy");
  }

  res
    .status(200)
    .json(new ApiResponse(200, reviews, "Reviews retrieved successfully"));
});

export const deletePharmacyReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;

  const result = await pharmacyService.deleteReview(reviewId, req.user.id);
  if (!result) {
    throw new ApiError(404, "Review not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, null, "Review deleted successfully"));
});

// Categories
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  console.log("This Is Category", categories);
  res
    .status(200)
    .json(
      new ApiResponse(200, categories, "Categories retrieved successfully")
    );
});

export const createCategory = asyncHandler(async (req, res) => {
  const category = await Category.create(req.body);
  res
    .status(201)
    .json(new ApiResponse(201, category, "Category created successfully"));
});

export const fetchPharmacies = asyncHandler(async (req, res) => {
  const pharmacies = await pharmacyService.fetchPharmacies();
  res
    .status(201)
    .json(new ApiResponse(201, pharmacies, "Fetched Pharmacies Successfully"));
});

export const getPharmacyDetails = asyncHandler(async (req, res) => {
  const pharmacyId = req.params.id; // Get pharmacy ID from the route parameters

  // Call the service to fetch pharmacy details
  const pharmacy = await pharmacyService.fetchPharmacyDetails(pharmacyId);

  // Respond with the pharmacy details
  res
    .status(200)
    .json(new ApiResponse(200, pharmacy, "getting Pharmacy Successfully"));
});
// Exporting All Controllers
export default {
  getPharmacyOrders,
  updateOrderStatus,
  getPharmacyProfile,
  updatePharmacyProfile,
  changePassword,
  getPharmacyMedicines,
  createMedicine,
  updateMedicine,
  removeMedicine,
  getPharmacyReviews,
  deletePharmacyReview,
  getCategories,
  createCategory,
  fetchPharmacies,
  getPharmacyDetails
};
