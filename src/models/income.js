const mongoose = require("../config/atlas_connect");

const schema = new mongoose.Schema(
  {
    name: {
      desc: "Name of income owner",
      type: String,
    },
    amount: {
      desc: "Income amount",
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