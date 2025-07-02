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

export const sendNotification = async (
  targetUserId,
  notificationData,
  role
) => {
  const notification = await Notification.create({
    [role]: targetUserId, // will assign to either 'customer' or 'pharmacy'
    ...notificationData,
  });
  console.log("This Is The Target User In SendNotification", targetUserId);
  // Send to correct socket room
  io.to(`user_${targetUserId}`).emit("new-notification", notification);
};
