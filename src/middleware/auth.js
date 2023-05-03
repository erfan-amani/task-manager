const jwt = require("jsonwebtoken");

const User = require("../model/user");

const userAuth = async (req, res, next) => {
  try {
    const bearer = req.header("Authorization");
    const token = bearer.split(" ")[1];

    const decoded = jwt.verify(token, "taskmanagerapp");
    const user = await User.findOne({ _id: decoded.id, "tokens.token": token });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    req.token = token;

    next();
  } catch (err) {
    res.status(401).send("Not authorized!");
  }
};

module.exports = userAuth;
