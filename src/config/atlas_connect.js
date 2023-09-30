const mongoose = require('mongoose');
require('dotenv/config')

mongoose
  .connect(process.env.ATLAS_DB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = mongoose;