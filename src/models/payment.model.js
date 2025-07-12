import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema({
  orderId: {
    type: Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  sellerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  platformCut: {
    type: Number,
    required: true,
  },
  payoutAmount: {
    type: Number,
    required: true,
  },
  payoutStatus: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  }
}, {
  timestamps: true,
});

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
