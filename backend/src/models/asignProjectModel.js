const mongoose = require("mongoose");

const asignProjectSchema = new mongoose.Schema(
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
      required: true,
    },
  },
  { timestamps: true }
);

const AsignProject = mongoose.model("AsignProject", asignProjectSchema);

module.exports = AsignProject;
