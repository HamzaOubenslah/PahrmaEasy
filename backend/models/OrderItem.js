import mongoose from 'mongoose';
import Medicine from './Medicine.js';
const orderItemSchema = new mongoose.Schema({
  // order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  medicine: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine' },
  quantity: Number,
}, { timestamps: true });

export default mongoose.model('OrderItem', orderItemSchema);
