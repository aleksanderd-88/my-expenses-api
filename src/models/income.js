const mongoose = require("../config/atlas_connect");

const schema = new mongoose.Schema(
  {
    amount: {
      desc: "Expense cost",
      type: Number,
      required: true
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

module.exports = mongoose.model("Income", schema);