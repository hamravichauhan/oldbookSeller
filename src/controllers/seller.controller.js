import Book from "../models/book.model.js";
import Order from "../models/order.model.js";

// ✅ Get all books by this seller
export const getMyBooks = async (req, res) => {
  const books = await Book.find({ seller: req.user.id });
  res.status(200).json(books);
};

// ✅ Update a book (only if owned by seller)
export const updateMyBook = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id);

  if (!book) return res.status(404).json({ message: "Book not found" });
  if (book.seller.toString() !== req.user.id)
    return res.status(403).json({ message: "Not allowed" });

  const updates = req.body;
  if (req.file?.path) updates.imageUrl = req.file.path;

  const updated = await Book.findByIdAndUpdate(id, updates, { new: true });
  res.status(200).json({ message: "Book updated", book: updated });
};

// ✅ Delete a book (only if owned)
export const deleteMyBook = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id);

  if (!book) return res.status(404).json({ message: "Book not found" });
  if (book.seller.toString() !== req.user.id)
    return res.status(403).json({ message: "Not allowed" });

  await Book.findByIdAndDelete(id);
  res.status(200).json({ message: "Book deleted" });
};

// ✅ Get all orders for seller’s books
export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ seller: req.user.id }).populate("book buyer");
  res.status(200).json(orders);
};
