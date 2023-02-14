const Store = require("../models/store");
const Stock = require("../models/stock");
const SoldDrug = require("../models/soldDrugs");

const StockOrder = require("../models/stockOrder");
const StoreOrder = require("../models/storeOrder");

const StoreRequest = require("../models/storeRequest");
const StockRequest = require("../models/stockRequest");

exports.getDrugs = async (req, res, next) => {
  try {
    const storeDrugs = await Store.findAll({});
    const stockDrugs = await Stock.findAll({});

    const soldDrugs = await SoldDrug.findAll({});
    const stockRequests = await StockRequest.findAll({});
    const storeOrders = await StoreOrder.findAll({});

    if (!storeDrugs) {
      const error = new Error("unable to load drugs");
      error.statusCode = 500;
      throw error;
    }

    res.json({
      status: "success",
      drugs: {
        availbleStockDrugs: stockDrugs,
        availbleStoreDrugs: storeDrugs,
        expiredDrugs: soldDrugs,
        storeOrders,
        stockRequests,
      },
    });
  } catch (error) {
    res.json({
      status: "fail",
      message: "unable to fetch data",
      drugs: {
        availbleStockDrugs: [],
        availbleStoreDrugs: [],
        expiredDrugs: [],
        storeOrders: [],
        stockRequests: [],
      },
    });
  }
};
exports.updateDrug = async (req, res, next) => {
  const { drugCode, newPrice, newAmount, currentSlide } = req.body;
  console.log(drugCode);
  let result;
  try {
    if (currentSlide == "availableStore")
      result = await Store.update(
        { price: newPrice, amount: newAmount },
        { where: { drugCode: drugCode } }
      );

    if (currentSlide == "availableStock")
      result = await Stock.update(
        { price: newPrice, amount: newAmount },
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
    const drugToDelete = await Store.findOne({ where: { drugCode: drugCode } });
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
  console.log(req.params);
  const drugsCode = req.params.drugCodes;

  const drugCodes = drugsCode.split(":");
  drugCodes.shift();
  try {
    Store.destroy({ where: { drugCode: drugCodes } });
  } catch (error) {}
};
exports.addRequest = (req, res, next) => {
  const date = new Date();
  let { storeRequest } = req.body;
  try {
    storeRequest = storeRequest.map((request) => {
      request.requestDate = date;
      return request;
    });
    StoreRequest.bulkCreate(storeRequest, { validate: true });
    res.json({ status: "success" });
  } catch (error) {
    console.log("error while sending requst to manager ");
    res.json({ status: "fail" });
  }
};
exports.registerDrugs = async (req, res, next) => {
  try {
    await Store.destroy({ truncate: true });
    const newDrugs = req.body.newDrugs.map((drug) => {
      delete drug._id;
      return drug;
    });
    await Store.bulkCreate(newDrugs, { validate: true });
    await StoreOrder.destroy({ truncate: true });
    res.json({ status: "success" });
  } catch (error) {
    res.json({ status: "fail" });
  }
};
exports.addToStock = async (req, res, next) => {
  const { stockOrders, availbleDrugs } = req.body;
  console.log(stockOrders);
  try {
    Store.destroy({
      where: {},
      truncate: true,
    });
    const updatedAvailableDrugs = availbleDrugs.map((drug) => {
      delete drug.id;
      return drug;
    });
    const updatedStockOrders = stockOrders.map((drug) => {
      delete drug.id;
      return drug;
    });
    await Store.bulkCreate(updatedAvailableDrugs, { validate: true });
    await StockOrder.bulkCreate(updatedStockOrders, { validate: true });
    res.json({ status: "success" });
  } catch (error) {
    res.json({ status: "fail" });
  }
};
exports.clearStockRequest = async (req, res, next) => {
  try {
    const result = await StockRequest.destroy({ truncate: true });
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
