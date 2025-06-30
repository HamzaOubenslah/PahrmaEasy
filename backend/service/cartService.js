// services/cartService.js
import { Types } from "mongoose";
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
  const totalPrice = cart.items.reduce(
    (sum, item) => sum + item.medicine.price * item.quantity,
    0
  );
  console.log("This Is The Cart Item", cart.items);
  const totalItems = cart.items.length;
  console.log("This Is The TotalPrice", totalPrice);
  return { cart, totalPrice, totalItems };
};

export const updateItemsInCart = async (customerId, medicineId, quantity) => {
  const cart = await Cart.findOne({ customer: customerId }).populate(
    "items.medicine"
  );
  if (!cart) throw new ApiError(404, "Cart Not Found");
  console.log("This Is The Type Of The Medicine Id", typeof medicineId);
  console.log("This Is The Medicine Id", medicineId);

  console.log("This The Items In The Cart", cart.items);
  let item = cart.items.find((i) =>
    i.medicine._id.equals(new Types.ObjectId(medicineId))
  );
  if (!item) throw new ApiError(404, "Items Not Found");
  item.quantity = quantity;
  await cart.save();
  const totalPrice = cart.items.reduce(
    (sum, item) => sum + item.medicine.price * item.quantity,
    0
  );
  const totalItems = cart.items.length;
  console.log("This Is The Cart", cart);

  return { cart, totalPrice, totalItems };
  // const updatedCart = await Cart.updateOne(
  //   { customer: customerId },
  //   {
  //     $set: {
  //       quantity,
  //     },
  //   }
  // );
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
