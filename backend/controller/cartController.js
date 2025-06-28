import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import {
  addToCartService,
  getCartService,
  removeFromCartService,
  clearCartService,
} from "../service/cartService.js";

// 📦 Add to Cart
export const addToCartController = asyncHandler(async (req, res, next) => {
  const customerId = req.user.id;
  const { medicineId, quantity } = req.body;

  const updatedCart = await addToCartService(customerId, medicineId, quantity);

  res
    .status(200)
    .json(new ApiResponse(200, updatedCart, "Medicine added to cart successfully"));
});

// 🛒 Get Cart
export const getCartController = asyncHandler(async (req, res, next) => {
  const customerId = req.user.id;

  const cart = await getCartService(customerId);

  res.status(200).json(new ApiResponse(200, cart, "Cart fetched successfully"));
});

// ❌ Remove from Cart
export const removeFromCartController = asyncHandler(async (req, res, next) => {
  const customerId = req.user.id;
  const { medicineId } = req.body;

  const updatedCart = await removeFromCartService(customerId, medicineId);

  res
    .status(200)
    .json(new ApiResponse(200, updatedCart, "Medicine removed from cart successfully"));
});

// 🧹 Clear Cart
export const clearCartController = asyncHandler(async (req, res, next) => {
  const customerId = req.user.id;

  const clearedCart = await clearCartService(customerId);

  res
    .status(200)
    .json(new ApiResponse(200, clearedCart, "Cart cleared successfully"));
});
