import Pharmacy from '../models/Pharmacy.js';
import Order from '../models/Order.js';
import Customer from '../models/Customer.js';
import Medicine from '../models/Medicine.js';
import Review from '../models/Review.js';
import ApiError from '../utils/ApiError.js';
import bcrypt from 'bcrypt';




const getMedicinesByPharmacy = async (pharmacyId) => {
  return await Medicine.find({ pharmacy: pharmacyId })
    .populate('category',"name")
    .lean();
};


const addMedicine = async (medicineData, pharmacyId) => {
  const medicine = new Medicine({
    ...medicineData,
    pharmacy: pharmacyId
  });
  await medicine.save();
  return medicine;
};

 
const editMedicine = async (medicineId, updateData, pharmacyId) => {
  // Find the medicine and populate the category information
  const medicine = await Medicine.findOne({ _id: medicineId, pharmacy: pharmacyId })
    .populate('category', 'name _id'); // assuming 'category' is the reference field
  
  if (!medicine) {
    throw new ApiError(404, 'Medicine not found or not associated with this pharmacy');
  }

  Object.assign(medicine, updateData);
  await medicine.save();
  
  // If the update included category change, we need to repopulate
  if (updateData.category) {
    await medicine.populate('category', 'name _id');
  }
  
  return medicine;
};


const deleteMedicine = async (medicineId, pharmacyId) => {
  const medicine = await Medicine.findOneAndDelete({ _id: medicineId, pharmacy: pharmacyId });
  if (!medicine) {
    throw new ApiError(404, 'Medicine not found or not associated with this pharmacy');
  }
  return medicine;
};




const getPharmacyReviews = async (pharmacyId) => {
  return await Review.find({ pharmacy: pharmacyId })
    .populate('customer',"name").lean();
};


const deleteReview = async (reviewId, pharmacyId) => {
  const review = await Review.findOneAndDelete({ _id: reviewId, pharmacy: pharmacyId })
   
  if (!review) {
    throw new ApiError(404, 'Review not found or not associated with this pharmacy');
  }
  return review;
};

const getPharmacyOrders = async (pharmacyId) => {
  return await Order.find({ pharmacy: pharmacyId })
    .populate('customer', 'name')
    .populate({
      path: 'orderItems',
      populate: {
        path: 'medicine',
        select: 'name price'
      }
    })
    .sort({ createdAt: -1 })
    .lean();
};




export default {
  getMedicinesByPharmacy,
  addMedicine,
  getPharmacyOrders , 
  editMedicine,
  deleteMedicine,
  getPharmacyReviews,
  deleteReview
};