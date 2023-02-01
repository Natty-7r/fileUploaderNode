const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const forStoreSchema = new Schema({
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
  state: { type: String, required: true },
});

module.exports = mongoose.model("forStore", forStoreSchema);
