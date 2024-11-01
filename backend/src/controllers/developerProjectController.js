const Model = require("../models/developerProjectModel");

exports.add = async (req, res) => {
  let data = req?.body;

  try {
    const result = await Model.create(data);

    res.status(200).json({
      success: true,
      message: "Project added successfully",
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
  const { user, status } = req.query;
  try {
    let query = {};
    if (user) {
      query.developer = user;
    }

    if (status) {
      query.status = status;
    }

    const result = await Model.find(query).populate("developer");

    if (!result) {
      return res.json({
        success: false,
        message: "Project not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "project found",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.single = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Model.findById(id);

    if (!result) {
      return res.json({
        success: false,
        message: "project not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "project found",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const result = await Model.findByIdAndUpdate(id, data, { new: true });

    if (!result) {
      return res.json({
        success: false,
        message: "peoject not updated",
      });
    }

    res.status(200).json({
      success: true,
      message: "peoject updated",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

exports.destroy = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Model.findByIdAndDelete(id);

    if (!result) {
      return res.json({
        success: false,
        message: "project not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "project deleted",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// update project status and add startdate
exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const result = await Model.findByIdAndUpdate(id, data, { new: true });

    if (!result) {
      return res.json({
        success: false,
        message: "project not updated",
      });
    }

    res.status(200).json({
      success: true,
      message: "project status update successfully",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
