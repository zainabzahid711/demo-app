// backend/routes/taskRoutes.js
const express = require("express");
const router = express.Router();
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

// GET /api/tasks - Get all tasks
// POST /api/tasks - Create a new task
router.route("/").get(getTasks).post(createTask);

// PUT /api/tasks/:id - Update a task
// DELETE /api/tasks/:id - Delete a task
router.route("/:id").put(updateTask).delete(deleteTask);

module.exports = router;
