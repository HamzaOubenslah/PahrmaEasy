import User from './User.js';
import mongoose from 'mongoose';
import Medicine from './Medicine.js';

const pharmacySchema = new mongoose.Schema({
  address: { type: String, required: true },
  phone: { type: String, required: true },
  licenseNumber: { type: String },
  operatingHours: String,
  is24Hours: { type: Boolean, default: false },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
      required: true
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  },
  medicines: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Medicine'  // Reference to the Medicine model
  }]
});

// Add 2dsphere index for location
pharmacySchema.index({ location: '2dsphere' });

const Pharmacy = User.discriminator('pharmacy', pharmacySchema);
export default Pharmacy;