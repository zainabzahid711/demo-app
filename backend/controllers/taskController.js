// backend/controllers/taskcontroller.js
const Task = require("../models/Task");

// @desc    Get all tasks
// @route   GET /api/tasks
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 }); // Get newest first
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Create a new task
// @route   POST /api/tasks
const createTask = async (req, res) => {
  if (!req.body.text) {
    return res.status(400).json({ error: "Please provide a text field" });
  }

  try {
    const task = await Task.create({
      text: req.body.text,
      completed: req.body.completed || false,
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Run model validators on update
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res
      .status(200)
      .json({ id: req.params.id, message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
