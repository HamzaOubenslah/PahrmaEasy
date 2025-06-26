import User from './User.js';
import mongoose from 'mongoose';

const pharmacySchema = new mongoose.Schema({
  address: { type: String, required: true },
  phone: { type: String, required: true },
  licenseNumber: { type: String, required: true },
  operatingHours: String,
  is24Hours: { type: Boolean, default: false },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  }
});

// Add 2dsphere index for location
pharmacySchema.index({ location: '2dsphere' });

const Pharmacy = User.discriminator('pharmacy', pharmacySchema);
export default Pharmacy;