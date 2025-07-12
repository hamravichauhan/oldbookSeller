import express from "express";
import {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
} from "../controllers/book.controller.js";

import { isAuthenticated, isSeller } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";


const router = express.Router();

// Public routes
router.get("/", getAllBooks);
router.get("/:id", getBookById);

// Protected routes (only sellers)
router.post("/", isAuthenticated, isSeller, upload.single("image"), createBook);
router.put("/:id", isAuthenticated, isSeller, upload.single("image"), updateBook);
router.delete("/:id", isAuthenticated, isSeller, deleteBook);

export default router;
