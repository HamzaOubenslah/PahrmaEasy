import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/ApiResponse.js';
import pharmacyService from '../service/pharmacyService.js';
import ApiError from '../utils/ApiError.js';

// Orders
export const getPharmacyOrders = asyncHandler(async (req, res) => {
  console.log("Pharmacy ID from token:", req.user.id)
  const orders = await pharmacyService.getOrdersByPharmacy(req.user.id);
  console.log(orders);
  
  res.status(200).json(new ApiResponse(200, orders, "Orders retrieved successfully"));
});

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  console.log("Pharmacy ID (req.user.id):", req.user.id); // ✅ Check logged-in pharmacy
  console.log("Order ID:", orderId); // ✅ Check order ID

  const order = await pharmacyService.changeOrderStatus(orderId, status, req.user.id);
  res.status(200).json(new ApiResponse(200, order, "Order status updated successfully"));
});


// Profile
export const getPharmacyProfile = asyncHandler(async (req, res) => {
  const profile = await pharmacyService.getPharmacyProfile(req.user.id);
  res.status(200).json(new ApiResponse(200, profile, "Profile retrieved successfully"));
});

// export const updatePharmacyProfile = asyncHandler(async (req, res) => {
//   const profile = await pharmacyService.updatePharmacyProfile(req.user.id, req.body);
//   res.status(200).json(new ApiResponse(200, profile, "Profile updated successfully"));
// });


export const updatePharmacyProfile = asyncHandler(async (req, res) => {
  // Check if a file was uploaded
  console.log("This Is The Req.file", req.file);
  let profileImageBase64 = null;
  
  if (req.file) {
    // Convert buffer to base64 string with MIME type
    const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
    profileImageBase64 = base64Image;
  }

  const updateData = {
    ...req.body,
    ...(profileImageBase64 && { profileImage: profileImageBase64 }),
  };

  const pharmacy = await pharmacyService.updatePharmacyProfile(req.user.id, updateData);
  res.status(200).json(new ApiResponse(200, pharmacy, "Profile updated successfully"));
});




export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  
  await pharmacyService.changePharmacyPassword(req.user.id, currentPassword, newPassword);
  res.status(200).json(new ApiResponse(200, null, "Password changed successfully"));
});

export const getPharmacyMedicines = asyncHandler(async (req, res) => {
  const medicines = await pharmacyService.getMedicinesByPharmacy(req.user.id);
  res.status(200).json(new ApiResponse(200, medicines, "Medicines retrieved successfully"));
});

export default {
  getPharmacyOrders,
  updateOrderStatus,
  getPharmacyProfile,
  updatePharmacyProfile,
  changePassword,
  getPharmacyMedicines

};