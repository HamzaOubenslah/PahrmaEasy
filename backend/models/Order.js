import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  pharmacy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['pending', 'shipped', 'delivered'], default: 'pending' },
  payment: { type: String, enum: ['card', 'cash'], required: true },
  totalPrice: Number,
  ordonance:String

}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
