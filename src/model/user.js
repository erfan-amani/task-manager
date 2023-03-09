const mongoose = require("mongoose");
const validator = require("validator");

const User = mongoose.model("User", {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate: (value) => {
      if (!validator?.isEmail(value))
        throw new Error("Please enter a valid email!");
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 7,
  },
});

module.exports = User;
