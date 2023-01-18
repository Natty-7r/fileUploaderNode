const express = require("express");
const mongoose = require("mongoose");
const Drug = require("./models/drug");
const bodyParser = require("body-parser");

const coordinatorRoutes = require("./routes/coordinator");

const addDrug = () => {
  const drug = new Drug({
    name: "diclone",
    amount: 25,
    price: 20,
    supplier: "dagi store",
    expireDate: new Date("12/12/41"),
    suppliedDate: new Date("12/12/12"),
    state: "stock",
  });
  drug.save();
};
// addDrug();
const app = express();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(bodyParser.json());

app.use(coordinatorRoutes);

mongoose
  .connect("mongodb://0.0.0.0:27017/drug-store")
  .then((connectd) => {
    app.listen(8080);
  })
  .catch((err) => console.log(err));
