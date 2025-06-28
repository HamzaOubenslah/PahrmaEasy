// services/cartService.js
import Cart from "../models/cart.js";
import Medicine from "../models/Medicine.js";
import ApiError from "../utils/ApiError.js";

export const addToCartService = async (customerId, medicineId, quantity) => {
  const medicine = await Medicine.findById(medicineId);
  if (!medicine) throw new ApiError(404, "Medicine not found");

  let cart = await Cart.findOne({ customer: customerId });

  if (!cart) {
    cart = new Cart({ customer: customerId, items: [] });
  }

  const existingItem = cart.items.find(
    (item) => item.medicine.toString() === medicineId
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ medicine: medicineId, quantity });
  }

  await cart.save();
  return cart;
};

export const getCartService = async (customerId) => {
  const cart = await Cart.findOne({ customer: customerId }).populate(
    "items.medicine"
  );
  if (!cart) throw new ApiError(404, "Cart not found");
  return cart;
};

export const removeFromCartService = async (customerId, medicineId) => {
  const cart = await Cart.findOne({ customer: customerId });
  if (!cart) throw new ApiError(404, "Cart not found");

  cart.items = cart.items.filter(
    (item) => item.medicine.toString() !== medicineId
  );

  await cart.save();
  return cart;
};

export const clearCartService = async (customerId) => {
  const cart = await Cart.findOne({ customer: customerId });
  if (!cart) throw new ApiError(404, "Cart not found");

  cart.items = [];
  await cart.save();
  return cart;
};
