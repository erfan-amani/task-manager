const express = require("express");
const bodyParser = require("body-parser");

// config env file
require("dotenv").config({
  path: `${__dirname}/config/test.env`,
});

require("./db/mongoose");
const userRouter = require("./routes/user");
const taskRouter = require("./routes/task");

const port = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/user", userRouter);
app.use("/task", taskRouter);

app.use(express.json());

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
