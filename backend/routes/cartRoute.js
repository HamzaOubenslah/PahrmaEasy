// routes/cartRoutes.js
import express from "express";
import {
  addToCartController,
  getCartController,
  updateItemInCartController,
  removeFromCartController,
  clearCartController,
} from "../controller/cartController.js";
import VerifyToken from "../middleware/VerifyToken.js";

const router = express.Router();

router.get("/", VerifyToken, getCartController);
router.post("/add", VerifyToken, addToCartController);
router.put("/edit", VerifyToken, updateItemInCartController);
router.delete("/remove/:medicineId", VerifyToken, removeFromCartController);
router.delete("/clear", VerifyToken, clearCartController);

export default router;
