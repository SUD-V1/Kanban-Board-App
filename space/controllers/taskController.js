const Section = require("../models/sectionModel");
const Task = require("../models/taskModel");
const createResponse = require("../helpers/taskHelper");
const postTask = async (req, res) => {
  const section = await Section.findById(req.params.sectionId);
  if (!section) {
    return res
      .status(404)
      .json(createResponse("Error", 404, "Section not found"));
  }

  const task = new Task({
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    subtitle: req.body.subtitle,
    assignee: req.body.assignee,
    date: req.body.date,
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
const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const task = await Task.findById(taskId);
  if (!task) {
    return res.status(404).json(createResponse("Error", 404, "Task not found"));
  }
  task.name = req.body.name;
  task.description = req.body.description;
  task.subtitle = req.body.subtitle;
  task.assignee = req.body.assignee;
  await task.save();

  res.status(200).json(createResponse("Task created successfully", 200, task));
};
const deleteTask = async (req, res) => {
  try {
    const section = await Section.findById(req.params.sectionId);
    if (!section) {
      return res
        .status(404)
        .json(createResponse("Error", 404, "Section not found"));
    }

    const taskIndex = section.list.indexOf(req.params.taskId);
    if (taskIndex === -1) {
      return res
        .status(404)
        .json(createResponse("Error", 404, "Task not found in Section"));
    }

    section.list.splice(taskIndex, 1);
    await section.save();

    // Optionally, you can also delete the child from the database
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
module.exports = { postTask, updateTask, deleteTask };
