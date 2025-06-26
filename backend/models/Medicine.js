import mongoose, { Types } from "mongoose";

const medicineSchema = new mongoose.Schema(
  {
    pharmacy: { type: mongoose.Schema.Types.ObjectId, ref: "Pharmacy" },
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    stock: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Medicine", medicineSchema);
