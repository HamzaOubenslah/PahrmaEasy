import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: String,
  description: String,
}, { timestamps: true });

const Category= mongoose.model('Category', categorySchema);
export default Category


