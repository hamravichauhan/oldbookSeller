import express from "express";
import {
  registerUser,
  loginUser,
  getMe,
  applySeller,
} from "../controllers/auth.controler.js";

import { isAuthenticated } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", isAuthenticated, getMe);
router.post("/apply-seller", isAuthenticated, applySeller);

export default router;
