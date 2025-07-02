import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import logger from "./utils/logger.js";
import authRoute from "./routes/authRoute.js";
import PharmacyRouter from "./routes/pharmacyRoute.js";
import Category from "./models/Category.js";
import OrderItem from "./models/OrderItem.js";
import Customer from "./models/Customer.js";
import User from "./models/User.js";
import Pharmacy from "./models/Pharmacy.js";
import Medicine from "./models/Medicine.js";
import Order from "./models/Order.js";
import orderRoute from "./routes/orderRoute.js";
import cartRoute from "./routes/cartRoute.js";
import { createServer } from "http";
import { initSocket } from "./service/socketService.js";
import medicineRoutes from "./routes/medicines.js";

// Initialize Express app
const app = express();
export const httpServer = createServer(app);
initSocket(httpServer);

// Security Middleware
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Routes
app.use("/api/auth", authRoute);
app.use("/api/pharmacy", PharmacyRouter);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);
app.use("/api/medicines", medicineRoutes);

// Request Logging
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

// Health Check Endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  logger.error(`Error: ${err.message}`);
  res.status(500).json({ message: "Internal Server Error" });
});

// Debugging: Log MongoDB Collection Names
console.log("Category Collection: ", Category.collection.name); // Should be 'categories'
console.log("OrderItem Collection: ", OrderItem.collection.name);
console.log("Pharmacy Collection: ", Pharmacy.collection.name);

// Optionally log the list of customers (if needed for debugging)
// console.log(User.find({ role: "customer" }));

export default app;
