const express = require("express");
const router = express.Router();
const {
  postTask,
  postBulkTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

router.post("/sections/:sectionId/task", postTask);
router.post("/sections/:sectionId/bulk-insert", postBulkTask);
router.put("/sections/:sectionId/task/:taskId", updateTask);
router.delete("/sections/:sectionId/task/:taskId", deleteTask);

module.exports = router;
