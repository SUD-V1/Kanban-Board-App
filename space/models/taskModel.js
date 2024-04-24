const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    subtitle: String,
    assignee: String,
    date: String
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
