const taskRouter = require("express").Router();

const taskController = require("../controller/task");
const userAuth = require("../middleware/auth");

taskRouter.post("/", userAuth, taskController.addTask);
taskRouter.get("/:id", userAuth, taskController.getTaskById);
taskRouter.get("/", userAuth, taskController.getAllTasks);
taskRouter.patch("/:id", userAuth, taskController.updateTask);
taskRouter.delete("/:id", userAuth, taskController.deleteTask);

module.exports = taskRouter;
