import express from "express";
import { placeOrder, getMyOrders, getSellerOrders } from "../controllers/order.controller.js";
import { isAuthenticated, isSeller } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", isAuthenticated, placeOrder); // Buyer places order
router.get("/my", isAuthenticated, getMyOrders); // Buyer order history
router.get("/seller", isAuthenticated, isSeller, getSellerOrders); // Seller views orders

export default router;
