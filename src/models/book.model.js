import mongoose, { Schema } from "mongoose";

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  author: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    required: true,
    trim: true,
  },

  condition: {
    type: String,
    enum: ['likeNew', 'good', 'almostGood', 'bad'],
    required: true,
  },

  price: {
    type: Number,
    required: true,
    min: [1, "Price must be at least 1"],
  },

  category: {
    type: String,
    required: true,
    trim: true,
  },

  images: [
    {
      url: { type: String, required: true },
      public_id: { type: String, required: true },
    }
  ],

  sellerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  isSold: {
    type: Boolean,
    default: false,
  },

}, {
  timestamps: true,
});

const Book = mongoose.model("Book", bookSchema);
export default Book;
