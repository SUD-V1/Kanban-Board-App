const express = require("express");
const router = express.Router();
const {
  getSection,
  postSection,
  updateSection,
  deleteSection,
} = require("../controllers/sectionController");
console.log(getSection, postSection);
router.get("/sections", getSection);
router.post("/sections", postSection);
router.put("/sections/:id", updateSection);
router.delete("/sections/:id", deleteSection);
module.exports = router;
