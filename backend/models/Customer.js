import User from './User.js';
import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  // Customer-specific fields
  deliveryAddresses: [{
    address: String,
    isDefault: { type: Boolean, default: false
     }
  }],
  favoritePharmacies: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Pharmacy' 
  }]
});

const Customer = User.discriminator('customer', customerSchema);
export default Customer;