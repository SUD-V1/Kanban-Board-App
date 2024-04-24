const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
  name: String,
  list: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
});

const Section = mongoose.model("Section", sectionSchema);

module.exports = Section;
