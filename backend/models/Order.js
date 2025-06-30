import mongoose from 'mongoose';
import { orderItemSchema } from './OrderItem.js';

const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  pharmacy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['pending', 'shipped', 'delivered'], default: 'pending' },
  totalPrice: Number,
  ordonance:String,
//   orderItems : [{ type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem' }]
  orderItems:[orderItemSchema]

}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
