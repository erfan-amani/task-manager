const User = require("../model/user");

const register = async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

const getAllUser = async (req, res) => {
  try {
    const users = await User.find();

    res.send(users);
  } catch (err) {
    res.status(500).send("Something went wrong!");
  }
};

const getUserById = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).send("User not found!");
    }

    res.send(user);
  } catch (err) {
    res.status(500).send("Something went wrong!");
  }
};

const updateUser = async (req, res) => {
  const canUpdate = ["name", "email", "password"];
  const wantUpdate = Object.keys(req.body);
  const validUpdate = wantUpdate.every((u) => canUpdate.includes(u));

  if (!validUpdate) {
    return res.status(400).send("Invalid update!");
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).send("User not found!");
    }

    res.send(user);
  } catch (err) {
    res.status(500).send("Something went wrong!");
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id, req.body);

    if (!user) {
      return res.status(404).send("User not found!");
    }

    res.send(user);
  } catch (err) {
    res.status(500).send("Something went wrong!");
  }
};

module.exports = {
  register,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
};
