const express = require("express");
const router = express.Router();
const Task = require("../models/tasks");

router.get("/", (req, res) => {
  res.render("tasks/all");
});

router.get("/addtask", (req, res) => {
  res.render("tasks/new");
});

router.post("/", (req, res) => {
  const { task, status, taskDone } = req.body;
  const new_task = new Task({
    task,
    status,
    taskDone,
  });

  new_task
    .save()
    .then(() => res.send(new_task))
    .catch((err) => res.send(err.message));
});

module.exports = router;
