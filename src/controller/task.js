const Task = require("../model/task");

const addTask = async (req, res) => {
  const data = req.body;

  const task = new Task({
    ...data,
    user: req.user._id,
  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (err) {
    res.status(400).send(err);
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).populate("user");
    res.send(tasks);
  } catch (err) {
    res.status(500).send("Something went wrong!");
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

    if (!task) {
      return res.status(404).send("Task not found!");
    }

    await task.populate("user");

    res.send(task);
  } catch (err) {
    console.log(err);
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
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

    if (!task) {
      return res.status(404).send("Task not found!");
    }

    wantUpdate.forEach((u) => (task[u] = req.body[u]));

    await task.save();

    res.send(task);
  } catch (err) {
    res.status(500).send("Something went wrong!");
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

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
