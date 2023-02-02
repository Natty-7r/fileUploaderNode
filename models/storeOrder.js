//  drug order accepted from supplier  to coordinator
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const storeOrderSchema = new Schema({
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

module.exports = mongoose.model("storeOrder", storeOrderSchema);
