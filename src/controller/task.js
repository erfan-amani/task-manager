const Task = require("../model/task");

const addTask = (req, res) => {
  const data = req.body;

  const task = new Task(data);

  task
    .save()
    .then(() => {
      res.status(201).send(task);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

const getAllTasks = (req, res) => {
  Task.find()
    .then((tasks) => {
      res.send(tasks);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const getTaskById = (req, res) => {
  const id = req.params.id;

  Task.findById(id)
    .then((task) => {
      if (!task) {
        return res.status(404).send("Task not found!");
      }

      res.send(task);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

module.exports = {
  addTask,
  getAllTasks,
  getTaskById,
};
