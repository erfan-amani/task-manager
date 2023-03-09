const User = require("../model/user");

const register = (req, res) => {
  console.log(req.body);

  const user = new User(req.body);

  user
    .save()
    .then(() => {
      res.send(user);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

module.exports = {
  register,
};
