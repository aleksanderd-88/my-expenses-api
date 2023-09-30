const mongoose = require("../config/atlas_connect");

const schema = new mongoose.Schema(
  {
    name: {
      desc: "Expense name",
      trim: true,
      type: String,
      required: true
    },
    cost: {
      desc: "Expense cost",
      type: Number,
      required: true
    },
    isPaid: {
      desc: "Expense is paid or not",
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    strict: true,
    versionKey: false,
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

module.exports = mongoose.model("Expenses", schema);