const Task = require("../model/task");

const addTask = (req, res) => {
  const data = req.body;

  const task = new Task(data);

  task
    .save()
    .then(() => {
      res.send(task);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

module.exports = {
  addTask,
};
