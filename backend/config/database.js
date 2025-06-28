import mongoose from "mongoose";
import logger from "../utils/logger.js";
import dotenv from "dotenv";

dotenv.config();


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    logger.info("MongoDB Connected ✅");
  } catch (err) {
    logger.error(`MongoDB Connection Error ❌: ${err.message}`, {
      stack: err.stack,
    });

    console.log("MongoDB Connection Error ❌", err);
  }
};


export default connectDB;
