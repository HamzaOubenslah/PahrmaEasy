import Pharmacy from "../models/Pharmacy.js";
import Order from "../models/Order.js";
import Customer from "../models/Customer.js";
import Medicine from "../models/Medicine.js";
import Review from "../models/Review.js";
import ApiError from "../utils/ApiError.js";
import bcrypt from "bcrypt";
import { sendNotification } from "./socketService.js";

const getOrdersByPharmacy = async (pharmacyId) => {
  return await Order.find({ pharmacy: pharmacyId })
    .populate("customer", "name email")
    .populate({
      path: "orderItems",
      populate: {
        path: "medicine",
        // select: 'name price'
      },
    })
    .lean();
};

const changeOrderStatus = async (orderId, status, pharmacyId) => {
  const order = await Order.findOne({ _id: orderId, pharmacy: pharmacyId });
  if (!order) {
    throw new ApiError(
      404,
      "Order not found or not associated with this pharmacy"
    );
  }
  order.status = status;
  await order.save();
  const role = "customer";

  await sendNotification(
    order.customer,
    {
      type: "Update",
      content: `Votre commande a été ${
        status.toLowerCase() === "completed"
          ? "complétée"
          : status.toLowerCase()
      }.`,
    },
    role
  );

  return order;
};

const getPharmacyProfile = async (pharmacyId) => {
  return await Pharmacy.findById(pharmacyId).select("-password");
};

const updatePharmacyProfile = async (pharmacyId, updateData) => {
  const pharmacy = await Pharmacy.findById(pharmacyId);
  if (!pharmacy) {
    throw new ApiError(404, "Pharmacy not found");
  }

  // Only update the profileImage if it's provided in updateData
  if (updateData.profileImage) {
    pharmacy.profileImage = updateData.profileImage;
  }

  // Update other fields
  Object.assign(pharmacy, updateData);
  await pharmacy.save();

  return pharmacy;
};

const changePharmacyPassword = async (
  pharmacyId,
  currentPassword,
  newPassword
) => {
  const pharmacy = await Pharmacy.findById(pharmacyId);
  if (!pharmacy) {
    throw new ApiError(404, "Pharmacy not found");
  }

  const isMatch = await pharmacy.comparePassword(currentPassword);
  if (!isMatch) {
    throw new ApiError(400, "Current password is incorrect");
  }

  pharmacy.password = newPassword;
  await pharmacy.save();
  return pharmacy;
};

const getMedicinesByPharmacy = async (pharmacyId) => {
  return await Medicine.find({ pharmacy: pharmacyId })
    .populate("category", "name")
    .lean();
};

const addMedicine = async (medicineData, pharmacyId) => {
  const medicine = new Medicine({
    ...medicineData,
    pharmacy: pharmacyId,
  });
  await medicine.save();
  return medicine;
};

const editMedicine = async (medicineId, updateData, pharmacyId) => {
  const medicine = await Medicine.findOne({
    _id: medicineId,
    pharmacy: pharmacyId,
  }).populate("category", "name _id");

  if (!medicine) {
    throw new ApiError(
      404,
      "Medicine not found or not associated with this pharmacy"
    );
  }

  Object.assign(medicine, updateData);
  await medicine.save();

  // If the update included category change, we need to repopulate
  if (updateData.category) {
    await medicine.populate("category", "name _id");
  }

  return medicine;
};

const deleteMedicine = async (medicineId, pharmacyId) => {
  const medicine = await Medicine.findOneAndDelete({
    _id: medicineId,
    pharmacy: pharmacyId,
  });
  if (!medicine) {
    throw new ApiError(
      404,
      "Medicine not found or not associated with this pharmacy"
    );
  }
  return medicine;
};

const getPharmacyReviews = async (pharmacyId) => {
  return await Review.find({ pharmacy: pharmacyId })
    .populate("customer", "name")
    .lean();
};

const deleteReview = async (reviewId, pharmacyId) => {
  const review = await Review.findOneAndDelete({
    _id: reviewId,
    pharmacy: pharmacyId,
  });

  if (!review) {
    throw new ApiError(
      404,
      "Review not found or not associated with this pharmacy"
    );
  }
  return review;
};

const getPharmacyOrders = async (pharmacyId) => {
  return await Order.find({ pharmacy: pharmacyId })
    .populate("customer", "name")
    .populate({
      path: "orderItems",
      populate: {
        path: "medicine",
        select: "name price",
      },
    })
    .sort({ createdAt: -1 })
    .lean();
};

const fetchPharmacies = async () => {
  const pharmacies = await Pharmacy.find();
  if (!pharmacies) throw new ApiError(400, "Something Wrong");
  return pharmacies;
};

const fetchPharmacyDetails = async (id) => {
  try {
    // Step 1: Find pharmacy by its ID
    const pharmacy = await Pharmacy.findById(id);
    console.log("This Is The Pharmacy", pharmacy);

    if (!pharmacy) {
      throw new ApiError(404, "Pharmacy not found");
    }

    // Step 2: Fetch medicines using the ObjectIds stored in pharmacy's medicines field
    const medicines = await Medicine.find({ pharmacy: pharmacy._id });

    // Add the medicines to the pharmacy object
    pharmacy.medicines = medicines;

    return pharmacy;
  } catch (error) {
    throw new ApiError(500, error.message);
  }
};

const getAllMedicines = async () => {
  try {
    const medicines = await Medicine.find().populate("pharmacy").lean(); // Fetch all medicines from MongoDB
    console.log("This Is Medicines", medicines);
    return medicines;
  } catch (error) {
    throw new Error("Error fetching medicines");
  }
};

export default {
  getOrdersByPharmacy,
  changeOrderStatus,
  getPharmacyProfile,
  updatePharmacyProfile,
  changePharmacyPassword,
  getMedicinesByPharmacy,
  addMedicine,
  editMedicine,
  deleteMedicine,
  getPharmacyReviews,
  deleteReview,
  getPharmacyOrders,
  fetchPharmacies,
  fetchPharmacyDetails,
  getAllMedicines,
};
