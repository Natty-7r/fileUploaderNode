// drugs in the stock

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const stockSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    expireDate: {
      type: Date,
      required: true,
    },
    supplier: {
      type: String,
      required: true,
    },
    suppliedDate: { type: Date, required: true },
  },
  {}
);

module.exports = mongoose.model("stock", stockSchema);
