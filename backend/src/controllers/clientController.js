const bcrypt = require("bcrypt");
const Model = require("../models/clientModel");

exports.add = async (req, res) => {
  const data = req?.body;

  try {
    const result = await Model.create(data);

    if (!result) {
      return res.json({
        success: false,
        message: "client not added",
      });
    }

    res.status(200).json({
      success: true,
      message: "client added successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.all = async (req, res) => {
  const { sort } = req.query;

  try {
    const clients = await Model.find().sort({ onBoardDate: JSON.parse(sort) });

    if (!clients) {
      return res.json({
        success: false,
        message: "clients not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "clients found",
      data: clients,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
