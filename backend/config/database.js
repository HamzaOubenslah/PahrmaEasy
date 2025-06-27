import mongoose from "mongoose";
import logger from "../utils/logger.js";
import dotenv from "dotenv";
import Pharmacy from "../models/Pharmacy.js";
import Order from "../models/Order.js";
import Review from "../models/Review.js";
dotenv.config();

console.log("This Is The MongoURL", process.env.MONGO_URI);

const pharmacies = [
  {
    name: "Pharmacie Tilila",
    email: "tilila@example.com",
    password: "password123",
    role: "pharmacy",
    address: "Tilila, Agadir",
    phone: "0600000001",
    location: {
      type: "Point",
      coordinates: [-9.52145231934378, 30.40291129571856],
    },
  },
  {
    name: "Pharmacie Ait Mhand",
    email: "aitmhand@example.com",
    password: "password123",
    role: "pharmacy",
    address: "Ait Mhand, Agadir",
    phone: "0600000002",
    location: {
      type: "Point",
      coordinates: [-9.499773161584434, 30.374745235215556],
    },
  },
  {
    name: "Pharmacie Ait L9adi",
    email: "aitl9adi@example.com",
    password: "password123",
    role: "pharmacy",
    address: "Ait L9adi, Agadir",
    phone: "0600000003",
    location: {
      type: "Point",
      coordinates: [-9.495749847920031, 30.373097624898975],
    },
  },
  {
    name: "Pharmacie Assais",
    email: "assais@example.com",
    password: "password123",
    role: "pharmacy",
    address: "Assais, Agadir",
    phone: "0600000004",
    location: {
      type: "Point",
      coordinates: [-9.50318493157185, 30.37331977622418],
    },
  },
  {
    name: "Pharmacie La Volonté",
    email: "volonte@example.com",
    password: "password123",
    role: "pharmacy",
    address: "La Volonté, Agadir",
    phone: "0600000005",
    location: {
      type: "Point",
      coordinates: [-9.486619668534845, 30.376401644778472],
    },
  },
  {
    name: "Pharmacie AlYamama",
    email: "alyamama@example.com",
    password: "password123",
    role: "pharmacy",
    address: "AlYamama, Agadir",
    phone: "0600000006",
    location: {
      type: "Point",
      coordinates: [-9.485289292816482, 30.380955492119064],
    },
  },
  {
    name: "Pharmacie Lagouira",
    email: "lagouira@example.com",
    password: "password123",
    role: "pharmacy",
    address: "Lagouira, Agadir",
    phone: "0600000007",
    location: {
      type: "Point",
      coordinates: [-9.474260048957795, 30.380289088687746],
    },
  },
];

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    // await Pharmacy.insertMany(pharmacies);
    logger.info("MongoDB Connected ✅");
    // await Order.create([
    //   {
    //     customer: "685d646fa5196a45699bf17a", // Mick
    //     pharmacy: "685da842b6ae903f19fd1a76", // Hamza
    //     payment: "cash",
    //     totalPrice: 150,
    //     ordonance: "Paracetamol + Vit C",
    //   },
    //   {
    //     customer: "685d646fa5196a45699bf17a", // Mick
    //     pharmacy: "685da994b6ae903f19fd1a79", // Al Nour
    //     payment: "card",
    //     totalPrice: 250,
    //     ordonance: "Antibiotics prescription",
    //   },
    //   {
    //     customer: "685d646fa5196a45699bf17a", // Mick
    //     pharmacy: "685db34fb6ae903f19fd1a7c", // Marouane
    //     payment: "cash",
    //     totalPrice: 90,
    //     ordonance: "Cough syrup",
    //   },
    // ]);
    // console.log("Sample orders created.");

    // await Review.create([
    //   {
    //     customer: "685d646fa5196a45699bf17a", // Mick
    //     pharmacy: "685da842b6ae903f19fd1a76", // Hamza
    //     comment: "Very helpful staff!",
    //     rating: 5,
    //   },
    //   {
    //     customer: "685d646fa5196a45699bf17a", // Mick
    //     pharmacy: "685da994b6ae903f19fd1a79", // Al Nour
    //     comment: "Quick service, but not 24/7",
    //     rating: 4,
    //   },
    //   {
    //     customer: "685d646fa5196a45699bf17a", // Mick
    //     pharmacy: "685db34fb6ae903f19fd1a7c", // Marouane
    //     comment: "Didn't have my meds in stock.",
    //     rating: 2,
    //   },
    // ]);
  } catch (err) {
    logger.error("MongoDB Connection Error ❌", err);
    process.exit(1);
  }
};

export default connectDB;
