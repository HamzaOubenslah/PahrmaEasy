import mongoose from 'mongoose';

const medicineSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
}, { timestamps: true });

export default mongoose.model('Medicine', medicineSchema);
