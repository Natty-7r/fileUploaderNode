const Store = require("../models/store");
const Stock = require("../models/stock");
const SoldDrugs = require("../models/soldDrugs");

const StockOrder = require("../models/stockOrder");
const StoreOrder = require("../models/storeOrder");

const StoreRequest = require("../models/storeRequest");
const StockRequest = require("../models/stockRequest");

exports.getDrugs = async (req, res, next) => {
  try {
    const stockDrugs = await Stock.findAll({});
    if (!stockDrugs) {
      const error = new Error("unable to load drugs");
      error.statusCode = 500;
      throw error;
    }
    const now = new Date();
    const expiredDrugs = stockDrugs.filter((drug) => {
      return now > drug.expireDate;
    });
    const availbleStockDrugs = stockDrugs.filter((drug) => {
      return now < drug.expireDate;
    });
    const stockOrders = await StockOrder.findAll({});
    if (!stockDrugs) {
      const error = new Error("unable to load drugs");
      error.statusCode = 500;
      throw error;
    }
    res.json({
      status: "success",
      drugs: {
        availbleStockDrugs,
        expiredDrugs,
        stockOrders,
      },
    });
  } catch (error) {}
};

exports.requestDrug = async (req, res, next) => {
  const date = new Date();
  let { stockRequest: stockRequests } = req.body;
  try {
    stockRequests = stockRequests.map((request) => {
      request.requestDate = date;
      return request;
    });

    await StockRequest.bulkCreate(stockRequests, { validate: true });
    res.json({ status: "success" });
  } catch (error) {
    res.json({
      status: "fail",
      message: "error while sending requst to manager",
    });
  }
};
exports.acceptOrders = async (req, res, next) => {
  try {
    await Stock.destroy({ truncate: true });
    const newDrugs = req.body.newDrugs.map((drug) => {
      delete drug._id;
      return drug;
    });
    await Stock.bulkCreate(newDrugs, { validate: true });
    await StockOrder.destroy({ truncate: true });
  } catch (error) {}
};

exports.sellDrug = async (req, res, next) => {
  const { drugCode, newAmount } = req.body;
  try {
    result = await Stock.update(
      { amount: newAmount },
      { where: { drugCode: drugCode } }
    );
    if (!result.acknowledged) {
      const error = new Error("updating unsuccesfull");
      error.statusCode = 500;
      throw error;
    }
    res.json({ status: "success" });
  } catch (error) {
    res.json({ status: "fail" });
  }
};
exports.deleteDrug = async (req, res, next) => {
  const drugCode = req.params.drugCode;
  try {
    const drugToDelete = await Stock.findOne({ where: { drugCode: drugCode } });
    const result = await drugToDelete.destroy();
    if (!result) {
      const error = new Error("deleting unsuccesfull");
      error.statusCode = 500;
      throw error;
    }
    res.json({ status: "success" });
  } catch (error) {
    res.json({ status: "fail" });
  }
};

exports.deleteDrugs = (req, res, next) => {
  const drugsCode = req.params.drugsCode;
  const drugCodes = drugsCode.split(":");
  drugCodes.shift();
  try {
    Stock.destroy({ where: { drugCode: drugCodes } });
  } catch (error) {}
};
