const express = require("express");

require("./db/mongoose");
const userController = require("./controller/user");
const taskController = require("./controller/task");

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.post("/user/register", userController.register);
app.get("/user/:id", userController.getUserById);
app.get("/user", userController.getAllUser);

app.post("/task", taskController.addTask);
app.get("/task/:id", taskController.getTaskById);
app.get("/task", taskController.getAllTasks);

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
