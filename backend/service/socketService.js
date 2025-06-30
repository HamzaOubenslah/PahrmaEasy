import { Server } from "socket.io";
import Notification from "../models/Notification.js";

let io;

export const initSocket = (httpServer) => {
  console.log("initializinbg");
  io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("subscribe", (pharmacy) => {
      socket.join(`user_${pharmacy}`);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

export const sendNotification = async (pharmacyId, notificationData) => {
  const notification = await Notification.create({
    pharmacy:pharmacyId,
    ...notificationData,
  });

  io.to(`user_${pharmacyId}`).emit("new-notification", notification);
};
