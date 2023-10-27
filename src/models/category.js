const mongoose = require("../config/atlas_connect");

const schema = new mongoose.Schema(
  {
    label: {
      desc: "Category label",
      type: String,
      required: true,
      unique: true
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

module.exports = mongoose.model("Category", schema);