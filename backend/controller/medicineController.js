import Medicine from "../models/Medicine.js";
import asyncHandler from "../utils/asyncHandler.js";
import pharmacyService from "../service/pharmacyService.js";
import ApiResponse from "../utils/ApiResponse.js";

export const getAllMedicines = async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }
    if (category) {
      query.category = category;
    }

    const medicines = await Medicine.find(query);
    res.json(medicines);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addMedicine = async (req, res) => {
  try {
    const medicine = new Medicine(req.body);
    await medicine.save();
    res.status(201).json(medicine);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const fetchAllMedicines = asyncHandler(async (req, res) => {
  const medicines = await pharmacyService.getAllMedicines();
  res
    .status(200)
    .json(new ApiResponse(200, medicines, "getting Medicines Successfully")); // Send medicines as a JSON response
});
