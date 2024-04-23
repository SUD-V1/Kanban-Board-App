const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
  res.send("Hello World!");
});
router.post("/", (req, res) => {
  res.send("Got a POST request");
});
router.put("/task/:id", (req, res) => {
  res.send("Got a PUT request at /task");
});
router.delete("/task/:id", (req, res) => {
  res.send("Got a DELETE request at /task");
});

module.exports = router;
