import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    pharmacy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: String,
    type: {
      type: String,
      enum: ["Order", "Update", "Stock_Alert", "Ordonance_Upload"],
    },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);
