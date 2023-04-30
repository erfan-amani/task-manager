const mongoose = require("mongoose");

const uri = process.env.MONGODB_URI;

console.log(process.env.MONGODB_URI);

mongoose
  .connect(uri, {})
  .then(() => console.log("Connected to mongodb successfully."))
  .catch((err) => console.log(err));
