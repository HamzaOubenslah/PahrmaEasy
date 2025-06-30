import mongoose from 'mongoose';
import Medicine from './Medicine.js';
// const orderItemSchema = new mongoose.Schema({
//   // order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
import mongoose from "mongoose";

// const orderItemSchema = new mongoose.Schema({
//   medicine: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine' },
//   quantity: Number,
// }, { timestamps: true });
export const orderItemSchema = new mongoose.Schema(
  {
    medicine: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine" },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("OrderItem", orderItemSchema);
