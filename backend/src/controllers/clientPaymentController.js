const Model = require("../models/clientPaymentModel");
const Client = require("../models/clientModel");

exports.add = async (req, res) => {
  let data = req?.body;

  try {
    const result = await Model.create(data);

    if (!result) {
      return res.json({
        success: false,
        message: "client not added",
      });
    }

    const client = await Client.findById(data?.client);

    if (!client) {
      return res.json({
        success: false,
        message: "client not found",
      });
    }

    client.paymentHistory.push(result._id);
    client.paymentInfo.totalPayment += parseInt(data?.amount);
    client.paymentInfo.due =
      parseInt(client?.paymentInfo.totalPrice) -
      parseInt(client?.paymentInfo.totalPayment);

    await client.save();

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
  try {
    const result = await Model.find();

    if (!result) {
      return res.json({
        success: false,
        message: "payments not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "payments found",
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
        message: "payment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "payment found",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
