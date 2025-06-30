import { sendNotification } from "./socketService.js";
import User from "../models/User.js";

export const notifyPharmacy = async (pharmacyId, customerId) => {
  try {
    const pharmacy = await User.findOne({ _id: pharmacyId });
    const customer = await User.findOne({ _id: customerId });
    if (!pharmacy || !customer) return;

    await sendNotification(pharmacyId, {
      customer: customerId,
      type: "Order",
      content: `New Order By ${customer.name}`,
    });
  } catch (error) {
    console.error("Notification error:", error);
  }
};
