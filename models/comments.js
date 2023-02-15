// drugs in the stock

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../util/db");

const Stock = sequelize.define(
  "comments",
  {
    name: {
      type: DataTypes.STRING,
      required: true,
    },
    email: {
      type: DataTypes.STRING,
      required: true,
    },
    sender: {
      type: DataTypes.STRING,
      required: true,
    },
    message: {
      type: DataTypes.STRING,
      required: true,
    },
    status: {
      default: "unread",
      type: DataTypes.STRING,
      required: true,
    },

    commentDate: { type: DataTypes.DATE, required: true },
  },
  { timeStamp: false }
);

module.exports = Stock;
