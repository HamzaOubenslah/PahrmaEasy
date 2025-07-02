import express from "express";
import * as orderController from "../controller/orderController.js";
import VerifyToken from "../middleware/VerifyToken.js";
import upload from "../config/multer.js";

const Router = express.Router();

Router.post(
  "/create-order",
  VerifyToken,
  orderController.createOrderController
);

Router.post(
  "/upload-ordonance",
  upload.single("ordonance"),
  VerifyToken,
  orderController.uploadOrdonanceController
);
export default Router;
