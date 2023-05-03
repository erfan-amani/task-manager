const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI;

mongoose
  .connect(uri, {})
  .then()
  .catch((err) => console.log(err));
