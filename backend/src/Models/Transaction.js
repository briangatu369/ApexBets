const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    phoneNumber: { type: String, required: true },
    checkoutRequestID: { type: String, required: true },
    amount: { type: String, required: true },
    stkPushSent: { type: Boolean, default: false, required: true },
    settled: { type: Boolean, default: false, required: true },
    isTransactionSuccessful: { type: Boolean, default: false, required: true },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = { Transaction };
