const mongoose = require("mongoose");

const developerProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    developer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    technologies: {
      type: Array,
      required: true,
    },
    asignDate: {
      type: Date,
      required: true,
    },
    handoverDate: {
      type: Date,
      required: true,
    },
    note: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "ongoing", "completed"],
    },
    startDate: {
      type: Date,
    },
    completedDate: {
      type: Date,
    },
    projectInfo: {
      type: Object,
    },
  },
  { timestamps: true }
);

const DeveloperProject = mongoose.model(
  "DeveloperProject",
  developerProjectSchema
);

module.exports = DeveloperProject;
