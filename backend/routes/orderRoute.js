import express from "express";
import * as orderController from "../controller/orderController.js";
import VerifyToken from "../middleware/VerifyToken.js";

const Router = express.Router();

Router.post("/create-order", VerifyToken, orderController.createOrderController);

export default Router;
