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
      return res.status(404).send("Task not found!");
    }

    res.send(task);
  } catch (err) {
    res.status(500).send("Something went wrong!");
  }
};

const updateTask = async (req, res) => {
  const canUpdate = ["description", "completed"];
  const wantUpdate = Object.keys(req.body);
  const validUpdate = wantUpdate.every((u) => canUpdate.includes(u));

  if (!validUpdate) {
    return res.status(400).send("Invalid update!");
  }

  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res.status(404).send("Task not found!");
    }

    res.send(task);
  } catch (err) {
    res.status(500).send("Something went wrong!");
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id, req.body);

    if (!task) {
      return res.status(404).send("Task not found!");
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
  updateTask,
  deleteTask,
};
