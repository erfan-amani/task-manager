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
app.patch("/user/:id", userController.updateUser);
app.delete("/user/:id", userController.deleteUser);

app.post("/task", taskController.addTask);
app.get("/task/:id", taskController.getTaskById);
app.get("/task", taskController.getAllTasks);
app.patch("/task/:id", taskController.updateTask);
app.delete("/task/:id", taskController.deleteTask);

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
