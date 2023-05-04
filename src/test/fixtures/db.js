const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const User = require("../../model/user");

// userOne is used for testing auth routes
const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "Test",
  email: "test-user@gmail.com",
  password: "test-user-1234-@",
  tokens: [{ token: jwt.sign({ id: userOneId }, process.env.JWT_SECRET) }],
};

const setupDatabase = async () => {
  await User.deleteMany();
  await new User(userOne).save();
};

module.exports = {
  userOneId,
  userOne,
  setupDatabase,
};
