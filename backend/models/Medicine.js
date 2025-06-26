import mongoose from 'mongoose';

const medicineSchema = new mongoose.Schema({
  pharmacy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Pharmacy',
    required: true 
  },
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true, min: 0 },
  category: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category',
    required: true 
  },
  stock: { type: Number, required: true, min: 0 },
  image: String,
}, { timestamps: true });

export default mongoose.model('Medicine', medicineSchema);