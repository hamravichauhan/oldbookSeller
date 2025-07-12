import express from "express";
import {
  getAllUsers,
  getAllBooks,
  deleteBook,
  getAllOrders,
  approveSeller,
} from "../controllers/admin.controller.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";

const router = express.Router();

router.use(isAuthenticated, isAdmin); // All routes below are admin-protected

router.get("/users", getAllUsers);
router.get("/books", getAllBooks);
router.delete("/book/:id", deleteBook);
router.get("/orders", getAllOrders);
router.patch("/approve/:id", approveSeller);

export default router;
