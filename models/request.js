//  request from store coordinatore to manager

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../util/db");

const Request = sequelize.define("request", {
  sender: {
    type: DataTypes.STRING,
    required: true,
  },
  status: {
    type: DataTypes.STRING,
    required: true,
  },
  requestDate: { type: DataTypes.DATE, required: true },
});

module.exports = Request;
