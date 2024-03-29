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
      desc: "Hashed expense cost",
      type: String,
      required: true
    },
    isPaid: {
      desc: "Expense is paid or not",
      type: Boolean,
      default: false
    },
    paidAt: {
      desc: "Date when expense was paid at",
      type: Date,
      default: null,
    },
    paymentDue: {
      desc: "When payment is due",
      type: Date,
      required: true,
    },
    categoryId: {
      desc: "Link expense to a category",
      type: String,
      default: null,
    },
    userId: {
      desc: "Associated user id",
      type: String,
      required: true
    }
  },
  {
    strict: true,
    versionKey: false,
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

module.exports = mongoose.model("Expenses", schema);