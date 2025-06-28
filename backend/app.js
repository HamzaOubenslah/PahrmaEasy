import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import logger from "./utils/logger.js";
import authRoute from "./routes/authRoute.js";
import PharmacyRouter from "./routes/pharmacyRoute.js";
import Medicine from "./models/Medicine.js";
import Category from "./models/Category.js";
// Initialize Express app
const app = express();

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

app.use("/api/auth", authRoute);
app.use("/api/pharmacy", PharmacyRouter);

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

export default app;
