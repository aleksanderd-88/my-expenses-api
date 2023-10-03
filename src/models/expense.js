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
    paidAt: {
      desc: "Date when expense was paid at",
      type: Date,
      default: false,
      required: true,
    },
    paymentDue: {
      desc: "When payment is due",
      type: Date,
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