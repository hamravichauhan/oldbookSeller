import Book from "../models/book.model.js";
import mongoose from "mongoose";

// ✅ Create a new book (seller only)
export const createBook = async (req, res) => {
  try {
    const { title, author, description, condition, price, category } = req.body;
    const imageUrl = req.file?.path;

    if (!imageUrl) {
      return res.status(400).json({ message: "Image is required" });
    }

    const book = await Book.create({
      title,
      author,
      description,
      condition,
      price,
      category,
      imageUrl,
      seller: req.user.id,
    });

    res.status(201).json({
      message: "Book created successfully",
      book,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to create book", error: err.message });
  }
};

// ✅ Get all books (public)
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate("seller", "username email");
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch books", error: err.message });
  }
};

// ✅ Get book by ID (public)
export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id).populate("seller", "username email");
    if (!book) return res.status(404).json({ message: "Book not found" });

    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ message: "Error fetching book", error: err.message });
  }
};

// ✅ Update book (only owner)
export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) return res.status(404).json({ message: "Book not found" });
    if (book.seller.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedData = req.body;
    if (req.file?.path) {
      updatedData.imageUrl = req.file.path;
    }

    const updatedBook = await Book.findByIdAndUpdate(id, updatedData, { new: true });
    res.status(200).json({ message: "Book updated", book: updatedBook });
  } catch (err) {
    res.status(500).json({ message: "Failed to update book", error: err.message });
  }
};

// ✅ Delete book (only owner)
export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) return res.status(404).json({ message: "Book not found" });
    if (book.seller.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Book.findByIdAndDelete(id);
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete book", error: err.message });
  }
};
