const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    onBoardDate: {
      type: Date,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    onbordedBy: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: true,
    },
    remark: {
      type: String,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    totalPayment: {
      type: Number,
      required: true,
    },
    due: {
      type: Number,
      required: true,
    },
    paymentHistory: {
      type: Array,
      required: true,
    },
    services: [
      {
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        value: {
          type: String,
        },
        discount: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true }
);

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
