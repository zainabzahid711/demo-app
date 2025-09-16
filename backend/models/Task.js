// backend/model/Task.js
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Please add a text value"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

module.exports = mongoose.model("Task", taskSchema);
