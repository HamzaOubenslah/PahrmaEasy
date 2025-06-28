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
  const medicine = await Medicine.findOne({ _id: medicineId, pharmacy: pharmacyId });
  if (!medicine) {
    throw new ApiError(404, 'Medicine not found or not associated with this pharmacy');
  }

  Object.assign(medicine, updateData);
  await medicine.save();
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
  const review = await Review.findOneAndDelete({ _id: reviewId, pharmacy: pharmacyId });
  if (!review) {
    throw new ApiError(404, 'Review not found or not associated with this pharmacy');
  }
  return review;
};



export default {
  getMedicinesByPharmacy,
  addMedicine,
  editMedicine,
  deleteMedicine,
  getPharmacyReviews,
  deleteReview
};