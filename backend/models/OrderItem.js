import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  medicine: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine' },
  quantity: Number,
}, { timestamps: true });

export default mongoose.model('OrderItem', orderItemSchema);
