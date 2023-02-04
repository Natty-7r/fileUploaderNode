//  drug request from pharmacist to coordinator
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const stockRequestSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  requestDate: { type: Date, required: true },
});

module.exports = mongoose.model("stockRequest", stockRequestSchema);
