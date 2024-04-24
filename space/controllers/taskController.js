const mongoose = require("mongoose");
// Import models
const Section = require("../models/sectionModel");
const Task = require("../models/taskModel");
const createResponse = require("../helpers/taskHelper");

// Create task
const postTask = async (req, res) => {
  const section = await Section.findById(req.params.sectionId);
  if (!section) {
    return res
      .status(404)
      .json(createResponse("Error", 404, "Section not found!"));
  }
  const { name, description, subtitle, assignee, date } = req.body;
  const task = new Task({
    name,
    description,
    subtitle,
    assignee,
    date,
  });
  try {
    const newTask = await task.save();
    section.list.push(newTask);
    await section.save();
    res
      .status(201)
      .json(createResponse("Task created successfully", 201, newTask));
  } catch (err) {
    res.status(400).json(createResponse("Error", 400, err.message));
  }
};

// Create bulk task
const postBulkTask = async (req, res) => {
  const { sectionId } = req.params;
  const tasks = req.body;
  try {
    // Validate parent ID
    if (!mongoose.Types.ObjectId.isValid(sectionId)) {
      return res
        .status(400)
        .json(createResponse("Error", 404, "Invalid section ID!"));
    }
    // Check if section exists
    const section = await Section.findById(sectionId);
    if (!section) {
      return res
        .status(404)
        .json(createResponse("Error", 404, "Section not found!"));
    }
    // Insert many task documents
    const insertedtasks = await Task.insertMany(tasks);

    // Associate inserted tasks with section
    section.list.push(...insertedtasks.map((task) => task._id));
    await section.save();
    res
      .status(201)
      .json(createResponse("Tasks inserted successfully", 201, section.list));
  } catch (err) {
    res
      .status(500)
      .json(createResponse("Internal server error", 500, err.message));
  }
};

// Update task
const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const task = await Task.findById(taskId);
  if (!task) {
    return res
      .status(404)
      .json(createResponse("Error", 404, "Task not found!"));
  }
  const { name, description, subtitle, assignee } = req.body;
  task.name = name;
  task.description = description;
  task.subtitle = subtitle;
  task.assignee = assignee;
  await task.save();
  res.status(200).json(createResponse("Task created successfully", 200, task));
};

// Delete task
const deleteTask = async (req, res) => {
  try {
    const section = await Section.findById(req.params.sectionId);
    if (!section) {
      return res
        .status(404)
        .json(createResponse("Error", 404, "Section not found!"));
    }
    const taskIndex = section.list.indexOf(req.params.taskId);
    if (taskIndex === -1) {
      return res
        .status(404)
        .json(createResponse("Error", 404, "Task not found in Section!"));
    }
    section.list.splice(taskIndex, 1);
    await section.save();
    await Task.findByIdAndDelete(req.params.taskId);
    res
      .status(200)
      .json(
        createResponse("Task deleted from section successfully", 200, section)
      );
  } catch (err) {
    res.status(500).json(createResponse("Error", 500, err.message));
  }
};

// Export functions
module.exports = { postTask, postBulkTask, updateTask, deleteTask };
