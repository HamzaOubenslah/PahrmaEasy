import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import pharmacyService from '../service/pharmacyService.js';
import ApiError from '../utils/ApiError.js';
import Category from '../models/Category.js';


// Medicines
export const getPharmacyMedicines = asyncHandler(async (req, res) => {
  const medicines = await pharmacyService.getMedicinesByPharmacy(req.user.id);
  res.status(200).json(new ApiResponse(200, medicines, "Medicines retrieved successfully"));
});

export const createMedicine = asyncHandler(async (req, res) => {
  const medicine = await pharmacyService.addMedicine(req.body, req.user.id);
  res.status(201).json(new ApiResponse(201, medicine, "Medicine created successfully"));
});

export const updateMedicine = asyncHandler(async (req, res) => {
  const { medicineId } = req.params;
  
  const medicine = await pharmacyService.editMedicine(medicineId, req.body, req.user.id);
  res.status(200).json(new ApiResponse(200, medicine, "Medicine updated successfully"));
});

export const removeMedicine = asyncHandler(async (req, res) => {
  const { medicineId } = req.params;
  
  await pharmacyService.deleteMedicine(medicineId, req.user.id);
  res.status(200).json(new ApiResponse(200, null, "Medicine deleted successfully"));
});


// Reviews
export const getPharmacyReviews = asyncHandler(async (req, res) => {
  console.log("Pharmacy ID from token:", req.user.id)
  const reviews = await pharmacyService.getPharmacyReviews(req.user.id);
  console.log(reviews);
  
  res.status(200).json(new ApiResponse(200, reviews, "Reviews retrieved successfully"));
});

export const deletePharmacyReview = asyncHandler(async (req, res) => {
  const { reviewId } = req.params;
  
  await pharmacyService.deleteReview(reviewId, req.user.id);
  res.status(200).json(new ApiResponse(200, null, "Review deleted successfully"));
});


// Dans pharmacyController.js
 const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.status(200).json(new ApiResponse(200, categories, "Categories retrieved successfully"));
});

 const createCategory = asyncHandler(async (req, res) => {
  const category = await Category.create(req.body);
  res.status(201).json(new ApiResponse(201, category, "Category created successfully"));
});

 const getPharmacyOrders = asyncHandler(async (req, res) => {
  const orders = await pharmacyService.getPharmacyOrders(req.user.id);
  res.status(200).json(new ApiResponse(200, orders, "Orders retrieved successfully"));
}); 
export default {
  getPharmacyMedicines,
  createCategory,
  getPharmacyOrders ,
  getCategories , 
  createMedicine,
  updateMedicine,
  removeMedicine,
  getPharmacyReviews,
  deletePharmacyReview
};