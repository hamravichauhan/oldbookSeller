import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan"; // ✅ Import morgan

import authRoutes from "./src/routes/auth.routes.js";
import bookRoutes from "./src/routes/book.routes.js";
import orderRoutes from "./src/routes/order.routes.js";
import uploadRoutes from './src/routes/upload.routes.js';
import adminRoutes from "./src/routes/admin.routes.js";
import sellerRoutes from "./src/routes/seller.routes.js";

dotenv.config({ path: "./.env" });

const app = express();

// ✅ Enable CORS for frontend at http://localhost:5173
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

// ✅ Use morgan for logging all HTTP requests
app.use(morgan("dev")); // or use "combined" for detailed logs

// ✅ Body parser
app.use(express.json());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use('/api', uploadRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/seller", sellerRoutes);

// ✅ Health check
app.get("/", (req, res) => {
  res.send("📚 Old Book Selling API is running");
});

export default app;
