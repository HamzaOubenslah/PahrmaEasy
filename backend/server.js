import app from "./app.js";
import logger from "./utils/logger.js";
import connectDB from "./config/database.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
      console.log("This Is The Port", PORT);
      logger.info(`Environment: ${process.env.NODE_ENV || "development"}`);
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on("SIGTERM", () => {
  logger.info("SIGTERM received. Shutting down gracefully...");
  process.exit(0);
});

process.on("SIGINT", () => {
  logger.info("SIGINT received. Shutting down gracefully...");
  process.exit(0);
});

// server.js
process.on('unhandledRejection', (error) => {
  logger.error('Unhandled Rejection:', error);
  console.log('Unhandled Rejection:', error); // 👈 Add this
});

process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  console.log('Uncaught Exception:', error); // 👈 Add this
});

startServer();
