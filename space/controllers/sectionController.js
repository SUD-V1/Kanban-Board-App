const Section = require("../models/sectionModel");
const createResponse = require("../helpers/sectionHelper");
const getSection = async (req, res) => {
  try {
    const sections = await Section.find().populate("list");
    res.status(200).json(createResponse("Success", 200, sections));
  } catch (err) {
    res.status(500).json(createResponse("Error", 500, err.message));
  }
};

const postSection = async (req, res) => {
  const section = new Section({
    name: req.body.name,
  });
  try {
    const newSection = await section.save();
    res
      .status(201)
      .json(createResponse("Section created successfully", 201, newSection));
  } catch (err) {
    res.status(400).json(createResponse("Error", 400, err.message));
  }
};
const updateSection = async (req, res) => {
  try {
    const updatedSection = await Section.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedSection) {
      return res
        .status(404)
        .json(createResponse("Error", 404, "Section not found"));
    }
    res
      .status(200)
      .json(
        createResponse("Section updated successfully", 200, updatedSection)
      );
  } catch (err) {
    res.status(500).json(createResponse("Error", 500, err.message));
  }
};
const deleteSection = async (req, res) => {
  try {
    const section = await Section.findById(req.params.id);
    if (!section) {
      return res
        .status(404)
        .json(createResponse("Error", 404, "Section not found"));
    }
    await Section.findByIdAndDelete(section._id);
    res
      .status(200)
      .json(createResponse("Section deleted successfully", 200, section));
  } catch (err) {
    res.status(500).json(createResponse("Error", 500, err.message));
  }
};
module.exports = { getSection, postSection, updateSection, deleteSection };
