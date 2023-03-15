const taskRouter = require("express").Router();

const taskController = require("../controller/task");

taskRouter.post("/", taskController.addTask);
taskRouter.get("/:id", taskController.getTaskById);
taskRouter.get("/", taskController.getAllTasks);
taskRouter.patch("/:id", taskController.updateTask);
taskRouter.delete("/:id", taskController.deleteTask);

module.exports = taskRouter;
