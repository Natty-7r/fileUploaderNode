// drugs in the store

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../util/db");

const Store = sequelize.define(
  "storedrugs",
  {
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
    suppliedDate: { type: DataTypes.DATE, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = Store;
