const Task = require("../model/task");

const addTask = async (req, res) => {
  const data = req.body;

  const task = new Task(data);

  try {
    await task.save();
    res.status(201).send(task);
  } catch (err) {
    res.status(400).send(err);
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.send(tasks);
  } catch (err) {
    res.status(500).send("Something went wrong!");
  }
};

const getTaskById = async (req, res) => {
  const id = req.params.id;

  try {
    const task = await Task.findById(id);

    if (!task) {
      return res.send(404).send("Task not found!");
    }

    res.send(task);
  } catch (err) {
    res.status(500).send("Something went wrong!");
  }
};

module.exports = {
  addTask,
  getAllTasks,
  getTaskById,
};
