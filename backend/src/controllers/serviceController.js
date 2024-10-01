const Model = require("../models/serviceModel");

exports.add = async (req, res) => {
  let data = req?.body;

  try {
    const result = await Model.create(data);

    if (!result) {
      return res.json({
        success: false,
        message: "service not added",
      });
    }

    res.status(200).json({
      success: true,
      message: "service added successfully",
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
  try {
    const services = await Model.find();

    if (!services) {
      return res.json({
        success: false,
        message: "services not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "services found",
      data: services,
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
    const service = await Model.findById(id);

    if (!service) {
      return res.json({
        success: false,
        message: "service not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "service found",
      data: service,
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
    const service = await Model.findByIdAndUpdate(id, data, { new: true });

    if (!service) {
      return res.json({
        success: false,
        message: "service not updated",
      });
    }

    res.status(200).json({
      success: true,
      message: "service updated",
      data: service,
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
    const service = await Model.findByIdAndDelete(id);

    if (!service) {
      return res.json({
        success: false,
        message: "service not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "service deleted",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
