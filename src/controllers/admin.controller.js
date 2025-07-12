import User from "../models/user.model.js";
import Book from "../models/book.model.js";
import Order from "../models/order.model.js";

// ✅ View all users
export const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.status(200).json(users);
};

// ✅ View all books
export const getAllBooks = async (req, res) => {
  const books = await Book.find().populate("seller", "username email");
  res.status(200).json(books);
};

// ✅ Delete any book
export const deleteBook = async (req, res) => {
  const { id } = req.params;
  await Book.findByIdAndDelete(id);
  res.status(200).json({ message: "Book deleted by admin" });
};

// ✅ View all orders
export const getAllOrders = async (req, res) => {
  const orders = await Order.find().populate("buyer seller book");
  res.status(200).json(orders);
};

// ✅ Approve seller role
export const approveSeller = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.role = "seller";
  await user.save();

  res.status(200).json({ message: "Seller approved", user });
};
