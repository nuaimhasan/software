const mongoose = require("mongoose");

const clientPaymentSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const ClientPayment = mongoose.model("ClientPayment", clientPaymentSchema);

module.exports = ClientPayment;
