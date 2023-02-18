//  request from store coordinatore to manager

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../util/db");

const StoreRequest = sequelize.define("managerOrder", {
  name: {
    type: DataTypes.STRING,
    required: true,
  },
  status: {
    type: DataTypes.STRING,
    required: true,
    default: "pending",
  },

  amount: {
    type: DataTypes.INTEGER,
    required: true,
  },

  requestDate: { type: DataTypes.DATE, required: true },
});

module.exports = StoreRequest;
