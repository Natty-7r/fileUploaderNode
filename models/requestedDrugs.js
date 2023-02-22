//  request from store coordinatore to manager

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../util/db");

const RequestDrug = sequelize.define("requestedDrugs", {
  name: {
    type: DataTypes.STRING,
    required: true,
  },

  amount: {
    type: DataTypes.INTEGER,
    required: true,
  },
  status: {
    type: DataTypes.STRING,
    required: true,
    default: "unbilled",
  },
});

module.exports = RequestDrug;
