// drugs in the stock

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../util/db");

const Stock = sequelize.define("soldrugs", {
  drugCode: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primarykey: true,
  },
  name: {
    type: DataTypes.STRING,
    required: true,
  },
  price: {
    type: DataTypes.INTEGER,
    required: true,
  },
  amount: {
    type: DataTypes.INTEGER,
    required: true,
  },
  expireDate: {
    type: DataTypes.DATE,
    required: true,
  },
  supplier: {
    type: DataTypes.STRING,
    required: true,
  },
  status: {
    type: DataTypes.STRING,
    required: true,
    default: "unbilled",
  },
  soldDate: { type: DataTypes.DATE, required: true },
});

module.exports = Stock;
