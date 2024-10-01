const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["monthly", "ontime"],
    },
  },
  { timestamps: false }
);

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
