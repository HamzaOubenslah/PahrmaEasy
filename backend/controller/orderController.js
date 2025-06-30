import asyncHandler from "../utils/asyncHandler.js";
import { createOrderFromCartService } from "../service/orderService.js";
import ApiResponse from "../utils/ApiResponse.js";


export const createOrderController = asyncHandler(async (req, res, next) => {
  const customerId = req.user.id;

  const orders = await createOrderFromCartService(customerId);
  res
    .status(201)
    .json(new ApiResponse(200, orders, "Orders Created Successfully"));
});
