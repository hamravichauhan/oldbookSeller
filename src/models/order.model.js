import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
  buyerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  sellerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bookId: {
    type: Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
  paymentStatus: {
    type: String,
    enum: ["unpaid", "paid", "failed"],
    default: "unpaid",
  },
  deliveryAddress: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
