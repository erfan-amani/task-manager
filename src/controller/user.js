const User = require("../model/user");

const register = (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then(() => {
      res.status(201).send(user);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const getAllUser = (req, res) => {
  User.find()
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const getUserById = (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .then((user) => {
      if (!user) {
        return res.status(404).send("User not found!");
      }
      res.send(user);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

module.exports = {
  register,
  getAllUser,
  getUserById,
};
