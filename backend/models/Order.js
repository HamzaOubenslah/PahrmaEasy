import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  pharmacy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  // customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User',required:true },
  // pharmacy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' ,required:true},
  status: { type: String, enum: ['pending', 'shipped', 'delivered','cancelled'], default: 'pending' },
  payment: { type: String, enum: ['card', 'cash'], required: true },
  totalPrice: Number,
  ordonance:String,
  orderItems:[{type:mongoose.Schema.Types.ObjectId,ref:'OrderItem'}]
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
