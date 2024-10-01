const Model = require("../models/clientModel");
const ClientPayment = require("../models/clientPaymentModel");

exports.add = async (req, res) => {
  let data = req?.body;

  try {
    // make invoivce number
    const lastClient = await Model.findOne().sort({ onBoardDate: -1 });
    if (lastClient) {
      const lastInvoice = lastClient.paymentInfo.invoice;
      const newInvoiceNumber = parseInt(lastInvoice) + 1;
      data.paymentInfo.invoice = `${newInvoiceNumber}`;
    } else {
      data.paymentInfo.invoice = `1`;
    }

    const result = await Model.create(data);

    if (result?._id && data?.initialPayment > 0) {
      const paymentData = {
        client: result?._id,
        date: Date.now(),
        amount: data?.initialPayment,
      };

      const payment = await ClientPayment.create(paymentData);
      if (payment?._id) {
        await Model.updateOne(
          { _id: result?._id },
          {
            $push: { paymentHistory: payment?._id },
          }
        );
      }
    }

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
  const { sort, search, date, onBoardBy, status } = req.query;

  try {
    let query = {};

    if (search && search.trim()) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { number: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
      ];
    }
    if (onBoardBy && onBoardBy !== "all" && onBoardBy.trim())
      query.onbordedBy = onBoardBy;
    if (status && status !== "all" && status.trim()) query.status = status;

    if (date) {
      const dateRange = JSON.parse(date);
      if (Array.isArray(dateRange) && dateRange.length === 2) {
        query.onBoardDate = {
          $gte: new Date(dateRange[0]),
          $lte: new Date(dateRange[1]),
        };
      }
    }

    const clients = await Model.find(query)
      .sort({ onBoardDate: sort ? JSON.parse(sort) : -1 })
      .populate("paymentHistory", "amount date");

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

exports.single = async (req, res) => {
  const { id } = req.params;

  try {
    const client = await Model.findById(id).populate(
      "paymentHistory",
      "amount date"
    );

    if (!client) {
      return res.json({
        success: false,
        message: "client not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "client found",
      data: client,
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

    // delete all payment history
    if (result?.paymentHistory?.length > 0) {
      await ClientPayment.deleteMany({ _id: { $in: result?.paymentHistory } });
    }

    if (!result) {
      return res.json({
        success: false,
        message: "client not deleted",
      });
    }

    res.status(200).json({
      success: true,
      message: "client deleted successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
