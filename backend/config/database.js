import mongoose from "mongoose";
import logger from "../utils/logger.js";
import dotenv from "dotenv";
import Notification from "../models/Notification.js";
import { Types } from "mongoose";

dotenv.config();


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    logger.info("MongoDB Connected ✅");
    // addSampleNotificationsAutoTimestamps();
  } catch (err) {
    logger.error(`MongoDB Connection Error ❌: ${err.message}`, {
      stack: err.stack,
    });

    console.log("MongoDB Connection Error ❌", err);
  }
};

const addSampleNotificationsAutoTimestamps = async () => {
  const customerId = "685d646fa5196a45699bf17a";
  const pharmacyId = "685db34fb6ae903f19fd1a7c";

  const notifications = [
    {
      customer: new Types.ObjectId(customerId),
      pharmacy: new Types.ObjectId(pharmacyId),
      content: "Order processed - ready for pickup",
      type: "Order"
    },
    {
      customer: new Types.ObjectId(customerId),
      pharmacy: new Types.ObjectId(pharmacyId),
      content: "Medication back in stock",
      type: "Stock_Alert"
    },
    {
      customer: new Types.ObjectId(customerId),
      pharmacy: new Types.ObjectId(pharmacyId),
      content: "Prescription renewal reminder",
      type: "Update",
      isRead: true
    }
  ];

  return await Notification.insertMany(notifications);
};
export default connectDB;
