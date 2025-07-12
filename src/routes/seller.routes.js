import express from "express";
import {
  getMyBooks,
  updateMyBook,
  deleteMyBook,
  getMyOrders,
} from "../controllers/seller.controller.js";
import { isAuthenticated, isSeller } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";


const router = express.Router();

router.use(isAuthenticated, isSeller); // All routes below are for logged-in sellers only

router.get("/books", getMyBooks);
router.put("/book/:id", upload.single("image"), updateMyBook);
router.delete("/book/:id", deleteMyBook);
router.get("/orders", getMyOrders);

export default router;
