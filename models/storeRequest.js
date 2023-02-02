//  request from store coordinatore to manager

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const storeRequestSchema = new Schema({
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

module.exports = mongoose.model("storeRequest", storeRequestSchema);
