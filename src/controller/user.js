const User = require("../model/user");

const register = async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (err) {
    res.status(400).send(err);
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findByCredential(req.body.email, req.body.password);
    const token = await user.generateAuthToken();

    res.status(200).send({ user, token });
  } catch (err) {
    res.status(400).send(err.message || err);
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

const getProfile = async (req, res) => {
  try {
    const user = req.user;

    res.send(user);
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
    wantUpdate.forEach((u) => (req.user[u] = req.body[u]));

    await req.user.save();

    res.send(req.user);
  } catch (err) {
    res.status(500).send("Something went wrong!");
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user._id, req.body);

    if (!user) {
      return res.status(404).send("User not found!");
    }

    res.send(user);
  } catch (err) {
    res.status(500).send("Something went wrong!");
  }
};

const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((t) => t.token !== req.token);

    await req.user.save();

    res.send();
  } catch (err) {
    res.status(500).send("Something went wrong!");
  }
};

const logoutAll = async (req, res) => {
  try {
    req.user.tokens = [];
    req.user.save();

    res.send();
  } catch (err) {
    res.status(500).send("Something went wrong!");
  }
};

module.exports = {
  register,
  login,
  getAllUser,
  getProfile,
  getUserById,
  updateUser,
  deleteUser,
  logout,
  logoutAll,
};
