const Sequelize = require("sequelize");
// require("dotenv").config();

const sequelize = new Sequelize(
  "sewidrugstore",
  "root",
  "next@7",

  {
    host: "localhost",
    dialect: "mysql",
    logging: false,
  }
);

module.exports = sequelize;
