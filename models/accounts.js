// drugs in the stock

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../util/db");

const Account = sequelize.define(
  "accounts",
  {
    accountId: {
      type: DataTypes.STRING,
      required: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      required: true,
    },
    lastName: {
      type: DataTypes.STRING,
      required: true,
    },
    username: {
      type: DataTypes.STRING,
      required: true,
    },
    role: {
      type: DataTypes.STRING,
      required: true,
    },
    date: {
      type: DataTypes.DATE,
      required: true,
    },

    password: {
      type: DataTypes.STRING,
      required: true,
    },
    active: {
      default: true,
      type: DataTypes.BOOLEAN,
      required: true,
    },
  },
  { timeStamp: false }
);

module.exports = Account;
