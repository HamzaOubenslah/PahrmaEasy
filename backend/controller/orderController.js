import asyncHandler from "../utils/asyncHandler.js";
import {
  createOrderFromCartService,
  uploadOrdonance,
} from "../service/orderService.js";
import ApiResponse from "../utils/ApiResponse.js";

export const createOrderController = asyncHandler(async (req, res, next) => {
  const customerId = req.user.id;

  const orders = await createOrderFromCartService(customerId);
  res
    .status(201)
    .json(new ApiResponse(200, orders, "Orders Created Successfully"));
});

export const uploadOrdonanceController = asyncHandler(async (req, res) => {
  const customer = req.user.id;
  const { pharmacy } = req.body;
  const ordonance = req.file;
  const base64Image = `data:${
    req.file.mimetype
  };base64,${req.file.buffer.toString("base64")}`;
  const order = await uploadOrdonance({customer, pharmacy, ordonance:base64Image});
  res
    .status(200)
    .json(new ApiResponse(200, order, "Ordonance Uploaded Successfully"));
});
