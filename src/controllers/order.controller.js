import Order from "../models/order.model.js";
import Book from "../models/book.model.js";

// ✅ Place order (Buyer)
export const placeOrder = async (req, res) => {
  try {
    const { bookId } = req.body;

    const book = await Book.findById(bookId).populate("seller");
    if (!book) return res.status(404).json({ message: "Book not found" });

    const order = await Order.create({
      book: book._id,
      buyer: req.user.id,
      seller: book.seller._id,
      amount: book.price,
    });

    res.status(201).json({ message: "Order placed", order });
  } catch (err) {
    res.status(500).json({ message: "Order failed", error: err.message });
  }
};

// ✅ Get orders for current buyer
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user.id }).populate("book");
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to get orders", error: err.message });
  }
};

// ✅ Get orders received by seller
export const getSellerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ seller: req.user.id }).populate("book buyer");
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch seller orders", error: err.message });
  }
};
