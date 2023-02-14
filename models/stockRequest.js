//  drug request from pharmacist to coordinator

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../util/db");

const StockOrder = sequelize.define("stockrequests", {
  name: {
    type: DataTypes.STRING,
    required: true,
  },

  amount: {
    type: DataTypes.INTEGER,
    required: true,
  },

  requestDate: { type: DataTypes.DATE, required: true },
});

module.exports = StockOrder;
