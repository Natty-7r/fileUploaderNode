const express = require("express");
const mongoose = require("mongoose");
// const Drug = require("./models/stockOrder");
// const Drug = require("./models/storeOrder");
// const Drug = require("./models/store");
const Drug = require("./models/stock");
const Comment = require("./models/comments");
const RequestDrug = require("./models/requestedDrugs");
const Request = require("./models/request");
const bodyParser = require("body-parser");

// my
// const sequelize = require("./configs/dbConfig");
const sequelize = require("./util/db");

const coordinatorRoutes = require("./routes/coordinator");
const pharmacistRoutes = require("./routes/pharmacist");
const managerRoutes = require("./routes/manager");
const supplierRoutes = require("./routes/supplier");
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");

const addDrug = () => {
  const drug = new Drug({
    drugCode: 123,
    name: "diclone",
    amount: 100,
    price: 20,
    supplier: "dagi store",
    expireDate: new Date("12/12/05"),
    suppliedDate: new Date("12/12/12"),
  });
  drug.save();
};
// addDrug();
const addComment = () => {
  const comment = new Comment({
    name: "natty",
    sender: "supplier",
    message:
      "every thing is good man i like the way you handle things ayy  really really like it every thing is good man i like the way you handle things ayy  really really like it every thing is good man i like the way you handle things ayy  really really like it  ",
    commentDate: new Date("2/16/2023"),
    status: "unread",
  });
  comment.save();
};

const app = express();
app.use((req, res, next) => {
  console.log(req.url);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/coordinator", coordinatorRoutes);
app.use("/pharmacist", pharmacistRoutes);
app.use("/manager", managerRoutes);
app.use("/supplier", supplierRoutes);
app.use("/admin", adminRoutes);

const PORT = 8081;

Request.RequestDrugs = Request.hasMany(RequestDrug, { onDelete: "CASCADE" });
RequestDrug.belongsTo(Request);
sequelize
  .sync()
  // .sync({ update: true })
  .then((r) => {
    app.listen(PORT, () => {
      console.log(`server running at port ${PORT} `);
    });
  })
  .catch((err) => console.log(err));

app.listen(8080);
