// services/orderService.js
import Cart from "../models/cart.js";
import Order from "../models/Order.js";
import Medicine from "../models/Medicine.js";
import ApiError from "../utils/ApiError.js";
import { Types } from "mongoose";

export const createOrderFromCartService = async (customerId) => {
  const cart = await Cart.findOne({ customer: customerId }).populate("items.medicine");

  if (!cart || cart.items.length === 0) {
    throw new ApiError(400, "Cart is empty");
  }

  // Group items by pharmacy
  const pharmacyOrders = {};

  for (let item of cart.items) {
    const medicine = item.medicine;

    if (medicine.stock < item.quantity) {
      throw new ApiError(400, `Insufficient stock for ${medicine.name}`);
    }

    const pharmacyId = medicine.pharmacy.toString();

    if (!pharmacyOrders[pharmacyId]) {
      pharmacyOrders[pharmacyId] = {
        pharmacy: new Types.ObjectId(pharmacyId),
        orderItems: [],
        totalPrice: 0,
      };
    }

    pharmacyOrders[pharmacyId].orderItems.push({
      medicine: medicine._id,
      quantity: item.quantity,
      price: medicine.price * item.quantity,
    });

    pharmacyOrders[pharmacyId].totalPrice += medicine.price * item.quantity;

    // Reduce stock
    medicine.stock -= item.quantity;
    await medicine.save();
  }

  // Create orders
  const savedOrders = [];

  for (const pharmacyId in pharmacyOrders) {
    const { pharmacy, orderItems, totalPrice } = pharmacyOrders[pharmacyId];

    const order = new Order({
      customer: customerId,
      pharmacy,
      status: "pending",
      totalPrice,
      orderItems,
    });

    const savedOrder = await order.save();
    savedOrders.push(savedOrder);
  }

  // Clear cart
  cart.items = [];
  await cart.save();

  return savedOrders;
};
