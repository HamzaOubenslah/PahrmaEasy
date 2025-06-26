import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  pharmacy: { type: mongoose.Schema.Types.ObjectId, ref: 'Pharmacy' },
  comment: String,
  rating: Number,
}, { timestamps: true });

export default mongoose.model('Review', reviewSchema);
