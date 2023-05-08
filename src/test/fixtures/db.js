const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Task = require("../../model/task");

const User = require("../../model/user");

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: "User one",
  email: "test-use-oner@gmail.com",
  password: "test-use-oner-1234-@",
  tokens: [{ token: jwt.sign({ id: userOneId }, process.env.JWT_SECRET) }],
};

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  name: "User two",
  email: "test-user-two@gmail.com",
  password: "test-user-two-1234-@",
  tokens: [{ token: jwt.sign({ id: userTwoId }, process.env.JWT_SECRET) }],
};

const taskOne = {
  _id: new mongoose.Types.ObjectId(),
  description: "Task one for test",
  completed: false,
  user: userOneId,
};
const taskTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: "Task two for test",
  completed: true,
  user: userOneId,
};
const taskThree = {
  _id: new mongoose.Types.ObjectId(),
  description: "Task three for test",
  completed: true,
  user: userTwoId,
};

const setupDatabase = async () => {
  await User.deleteMany();
  await Task.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
  await new Task(taskOne).save();
  await new Task(taskTwo).save();
  await new Task(taskThree).save();
};

module.exports = {
  userOneId,
  userOne,
  userTwoId,
  userTwo,
  taskOne,
  taskTwo,
  taskThree,
  setupDatabase,
};
