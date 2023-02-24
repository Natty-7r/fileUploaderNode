const express = require("express");

const bodyParser = require("body-parser");
const pdf = require("pdf-creator-node");
const fs = require("fs");
var html = fs.readFileSync("./data/print.html", "utf8");
const createPdf = () => {
  const options = {
    format: "A3",
    orientation: "portrait",
    border: "10mm",
    header: {
      height: "45mm",
      contents: '<div style="text-align: center;">Author: Shyam Hajare</div>',
    },
    footer: {
      height: "28mm",
      contents: {
        first: "Cover page",
        2: "Second page", // Any page number is working. 1-based index
        default:
          '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
        last: "Last Page",
      },
    },
  };
  var document = {
    html: html,
    data: {},
    path: "./data/recipts/output.pdf",
    type: "",
  };
  pdf
    .create(document, options)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.error(error);
    });
};
// my
// const sequelize = require("./configs/dbConfig");
const RequestDrug = require("./models/requestedDrugs");
const Request = require("./models/request");

const sequelize = require("./util/db");

const coordinatorRoutes = require("./routes/coordinator");
const pharmacistRoutes = require("./routes/pharmacist");
const managerRoutes = require("./routes/manager");
const supplierRoutes = require("./routes/supplier");
const adminRoutes = require("./routes/admin");
const casherRoutes = require("./routes/casher");
const customerRoutes = require("./routes/customer");
const authRoutes = require("./routes/auth");

const app = express();
app.use((req, res, next) => {
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
app.use("/casher", casherRoutes);
app.use("/customer", customerRoutes);

const PORT = 8081;

Request.RequestDrugs = Request.hasMany(RequestDrug, { onDelete: "CASCADE" });
RequestDrug.belongsTo(Request);
sequelize
  .sync()
  .then((r) => {
    app.listen(PORT, () => {
      console.log(`server running at port ${PORT} `);
    });
  })
  .catch((err) => console.log(err));

app.listen(8080);
