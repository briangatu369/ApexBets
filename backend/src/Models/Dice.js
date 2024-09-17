const mongoose = require("mongoose");

const diceSchema = mongoose.Schema(
  {
    stake: {
      amount: { type: Number, required: true },
      accountType: { type: String, required: true },
    },
    mode: { type: String, required: true },
    numberOfDices: { type: Number, required: true },
    status: { type: String, required: true },
    results: { type: [Number], required: true },
    resultTotals: { type: Number, required: true },
    payout: { type: Number, required: true },
    multiplier: { type: Number, required: true },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

const Dice = mongoose.model("Dice", diceSchema);

module.exports = { Dice };
