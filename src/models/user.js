const mongoose = require("../config/atlas_connect");
const JWT = require('jsonwebtoken')
require('dotenv/config')

const schema = new mongoose.Schema(
  {
    name: {
      desc: "User name",
      type: String,
      required: true,
      trim: true
    },
    email: {
      desc: "User email",
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    password: {
      desc: "User hashed password",
      type: String,
      required: true,
      trim: true
    },
  },
  {
    strict: true,
    versionKey: false,
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

schema.methods.generateToken = function(payload = {}) {
  if ( !payload )
    throw Error('Payload is missing')

  return JWT.sign(payload, process.env.SECRET, { expiresIn: '1h'})
}

module.exports = mongoose.model("User", schema);