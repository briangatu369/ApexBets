const mongoose = require("mongoose");

const minesSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    stake: {
      amount: { type: Number, required: true },
      accountType: { type: String, required: true },
    },
    bombs: { type: Number, required: true },
    multiplier: { type: Number, required: true, default: 1 },
    payout: { type: Number, required: true, default: 0 },
    hasCashedOut: { type: Boolean, required: true, default: false },
    isBusted: { type: Boolean, required: true, default: false },
    gameOutcome: { type: [Number], required: true },
    isActive: { type: Boolean, required: true, default: true },
    bustedIndex: { type: [], require: true, default: [] },
    correctOpenedTiles: { type: [Number], required: true },
  },
  { timestamps: true }
);

const Mine = mongoose.model("Mine", minesSchema);

module.exports = Mine;
