import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import {
  addToCartService,
  getCartService,
  updateItemsInCart,
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
    .json(
      new ApiResponse(200, updatedCart, "Medicine added to cart successfully")
    );
});

// 🛒 Get Cart
export const getCartController = asyncHandler(async (req, res, next) => {
  const customerId = req.user.id;

  const { cart, totalPrice, totalItems } = await getCartService(customerId);

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { cart, totalPrice, totalItems },
        "Cart fetched successfully"
      )
    );
});

export const updateItemInCartController = asyncHandler(
  async (req, res, next) => {
    const customerId = req.user.id;
    const { medicineId, quantity } = req.body;
    const { cart, totalPrice, totalItems } = await updateItemsInCart(
      customerId,
      medicineId,
      quantity
    );
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { cart, totalPrice, totalItems },
          "Cart Item Updated Successfully"
        )
      );
  }
);

// ❌ Remove from Cart
export const removeFromCartController = asyncHandler(async (req, res, next) => {
  const customerId = req.user.id;
  const { medicineId } = req.body;

  const updatedCart = await removeFromCartService(customerId, medicineId);

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedCart,
        "Medicine removed from cart successfully"
      )
    );
});

// 🧹 Clear Cart
export const clearCartController = asyncHandler(async (req, res, next) => {
  const customerId = req.user.id;

  const clearedCart = await clearCartService(customerId);

  res
    .status(200)
    .json(new ApiResponse(200, clearedCart, "Cart cleared successfully"));
});
