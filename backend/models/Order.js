import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  pharmacy: { type: mongoose.Schema.Types.ObjectId, ref: 'Pharmacy' },
  status: { type: String, enum: ['pending', 'shipped', 'delivered'], default: 'pending' },
  payment: { type: String, enum: ['card', 'cash'], required: true },
  totalPrice: Number,
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
