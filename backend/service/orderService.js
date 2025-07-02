// services/orderService.js
import Cart from "../models/cart.js";
import Order from "../models/Order.js";
import Medicine from "../models/Medicine.js";
import ApiError from "../utils/ApiError.js";
import { Types } from "mongoose";
import { sendNotification } from "./socketService.js";
import { notifyPharmacy } from "./notificationService.js";
import Pharmacy from "../models/Pharmacy.js";
import Customer from "../models/Customer.js";
import User from "../models/User.js";


export const createOrderFromCartService = async (customerId) => {
  const cart = await Cart.findOne({ customer: customerId }).populate(
    "items.medicine"
  );

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

    // Use notifyPharmacy instead of sendNotification for stock alerts
    if (medicine.stock < 9 && medicine.stock >= 5) {
      await notifyPharmacy(
        pharmacyId,
        customerId,
        "Stock_Alert",
        `Le stock du médicament "${medicine.name}" est faible.`
      );
    } else if (medicine.stock < 5) {
      await notifyPharmacy(
        pharmacyId,
        customerId,
        "Stock_Alert",
        `Le stock du médicament "${medicine.name}" est critique.`
      );
    }

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

    // Notify pharmacy about the new order
    await notifyPharmacy(pharmacyId, customerId);

    const savedOrder = await order.save();
    savedOrders.push(savedOrder);
  }

  // Clear cart
  cart.items = [];
  await cart.save();

  return savedOrders;
};


export const uploadOrdonance = async ({ pharmacy, customer, ordonance }) => {
  try {
    if (!pharmacy || !customer)
      throw new ApiError(404, "Pharmacy ID And Customer ID Required");
    
    const ExistPharmacy = await User.findOne({ _id: pharmacy });
    console.log("This Is The Pharmacy", ExistPharmacy);
    
    const ExistCustomer = await User.findOne({ _id: customer });
    console.log("This Is The Customer", ExistCustomer);
    
    if (!ExistPharmacy || !ExistCustomer)
      throw new ApiError(404, "Pharmacy Or Customer Not Find");
    
    const order = await Order.create({ pharmacy, customer, ordonance });
    await order.save();
    
    console.log(
      "This Is The PharmacyId In Send Notification Of Upload Perscription",
      pharmacy
    );
    
    // 📋 Notification for pharmacy
    const pharmacyNotificationPayload = {
      type: `Ordonance_Upload`,
      content: `New Prescription By ${ExistCustomer.name}`,
      customer,
    };
    
    // 📋 Notification for customer  
    

    // ✅ Send to pharmacy
    await sendNotification(pharmacy, pharmacyNotificationPayload, "pharmacy");

    // ✅ Send to customer

    return order;
  } catch (error) {
    console.log("Ordonance Error :", error.message);
  }
};
