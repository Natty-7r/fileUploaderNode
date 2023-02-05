//  drug order accepted from supplier  to coordinator

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const storeOrderSchema = new Schema({
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
});

module.exports = mongoose.model("storeOrder", storeOrderSchema);
