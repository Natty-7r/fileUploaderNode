const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const drugsSchema = new Schema(
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
    state: { type: String, required: true },
  },
  {
    methods: {
      printOwner() {
        const id = this._id.toString();
        mongoose
          .model("Product")
          .find({})
          .then(([product]) => console.log(product.owner.name));
      },
    },
    statics: {
      printTitle(id) {
        mongoose
          .model("Product")
          .find({ _id: id })
          .then(([product]) => console.log(product.title));
      },
    },
  }
);

module.exports = mongoose.model("stock", drugsSchema);
