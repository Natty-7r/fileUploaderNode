const Store = require("../models/store");
const Stock = require("../models/stock");
const ManagerOrder = require("../models/managerOrder");

const StockOrder = require("../models/stockOrder");
const StoreOrder = require("../models/storeOrder");

const StoreRequest = require("../models/storeRequest");
const StockRequest = require("../models/stockRequest");
const { Socket } = require("socket.io");

exports.getIndex = async (req, res, next) => {
  try {
    const pendingOrders = await ManagerOrder.findAll({
      where: { status: "pending" },
    });
    const acceptedOrders = await ManagerOrder.findAll({
      where: { status: "accepted" },
    });
    const rejectedOrders = await ManagerOrder.findAll({
      where: { status: "rejected" },
    });

    if (!pendingOrders || !rejectedOrders || !acceptedOrders) {
      const error = new Error("unable to load drugs");
      error.statusCode = 500;
      throw error;
    }

    res.json({
      status: "success",
      orders: {
        pendingOrders,
        acceptedOrders,
        rejectedOrders,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: "fail",
      orders: {
        pendingOrders: [],
        acceptedOrders: [],
        rejectedOrders: [],
      },
    });
  }
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
  const today = new Date();
  try {
    let drugSold = await Stock.findOne({ where: { drugCode: drugCode } });
    drugSold = drugSold.dataValues;
    drugSold.soldDate = today;
    drugSold.amount -= newAmount;
    delete drugSold.id;

    result = await Stock.update(
      { amount: newAmount },
      { where: { drugCode: drugCode } }
    );
    console.log(drugSold);
    drugSold = new SoldDrugs(drugSold);
    await drugSold.save();
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
