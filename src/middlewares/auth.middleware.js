import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// ✅ Middleware: Check if token is valid and user is logged in
export const isAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Bearer <token>

  if (!token) return res.status(401).json({ message: "Unauthorized: Token missing" });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// ✅ Middleware: Only admin
export const isAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }
  next();
};

// ✅ Middleware: Only seller
export const isSeller = (req, res, next) => {
  if (req.user?.role !== "seller") {
    return res.status(403).json({ message: "Access denied: Sellers only" });
  }
  next();
};

// ✅ Middleware: Only buyer
export const isBuyer = (req, res, next) => {
  if (req.user?.role !== "user") {
    return res.status(403).json({ message: "Access denied: Buyers only" });
  }
  next();
};
