import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
  pharmacy: { type: mongoose.Schema.Types.ObjectId, ref: 'Pharmacy' },
  medicine: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine' },
  stock: Number,
}, { timestamps: true });

export default mongoose.model('Inventory', inventorySchema);
