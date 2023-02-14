const express = require("express");
const mongoose = require("mongoose");
const Drug = require("./models/stock");
// const Drug = require("./models/stockOrder");
// const Drug = require("./models/storeOrder");
// const Drug = require("./models/store");
const bodyParser = require("body-parser");

// my
// const sequelize = require("./configs/dbConfig");
const sequelize = require("./util/db");

const coordinatorRoutes = require("./routes/coordinator");
const pharmacistRoutes = require("./routes/pharmacist");

const addDrug = () => {
  const drug = new Drug({
    drugCode: 123,
    name: "diclone",
    amount: 25,
    price: 20,
    supplier: "dagi store",
    expireDate: new Date("12/12/05"),
    suppliedDate: new Date("12/12/12"),
    state: "stock",
  });
  drug.save();
};
// addDrug();

const app = express();
app.use((req, res, next) => {
  console.log(req.url);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(bodyParser.json());

app.use("/coordinator", coordinatorRoutes);
app.use("/pharmacist", pharmacistRoutes);

const PORT = 8081;
sequelize
  .sync()
  // .sync({ force: true })
  .then((r) => {
    app.listen(PORT, () => {
      console.log(`server running at port ${PORT} `);
    });
  })
  .catch((err) => console.log(err, "jjjjjjjjjjjjjjj"));

app.listen(8080);
