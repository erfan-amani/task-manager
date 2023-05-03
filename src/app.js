const express = require("express");
const bodyParser = require("body-parser");

// config env file
require("dotenv").config({
  path: `${__dirname}/config/test.env`,
});

require("./db/mongoose");
const userRouter = require("./routes/user");
const taskRouter = require("./routes/task");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/user", userRouter);
app.use("/task", taskRouter);

app.use(express.json());

module.exports = app;
