import { sendNotification } from "./socketService.js";
import User from "../models/User.js";

export const notifyPharmacy = async (pharmacyId, customerId, type, message) => {
  try {
    const pharmacy = await User.findOne({ _id: pharmacyId });
    const customer = await User.findOne({ _id: customerId });
    if (!pharmacy || !customer) return;

    await sendNotification(
      pharmacyId,
      {
        customer: customerId, // optional: who made the order
        type: !type ? "Order" : type,
        content: !message ? `New Order By ${customer.name}` : message,
      },
      "pharmacy"
    );
  } catch (error) {
    console.error("Notification error:", error);
  }
};
