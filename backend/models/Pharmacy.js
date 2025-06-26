import mongoose from "mongoose";

const pharmacySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    location: {
      type: { type: String, enum: ["Point"], default: "Point" },
      coordinates: [Number],
    },
  },
  { timestamps: true }
);

pharmacySchema.index({ location: "2dsphere" });

export default mongoose.model("Pharmacy", pharmacySchema);
