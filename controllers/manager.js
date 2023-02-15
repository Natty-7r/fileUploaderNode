const Store = require("../models/store");
const Stock = require("../models/stock");
const SoldDrug = require("../models/soldDrugs");
const Comment = require("../models/comments");
const ManagerOrder = require("../models/managerOrder");

const StockOrder = require("../models/stockOrder");
const StoreOrder = require("../models/storeOrder");

const StoreRequest = require("../models/storeRequest");
const StockRequest = require("../models/stockRequest");

exports.getDrugs = async (req, res, next) => {
  try {
    const storeDrugs = await Store.findAll({});
    const stockDrugs = await Stock.findAll({});

    const soldDrugs = await SoldDrug.findAll({});
    const storeRequests = await StoreRequest.findAll({});
    const comments = await Comment.findAll({});

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
        storeOrders: [],
        stockRequests: [],
        comments,
        storeRequests,
      },
    });
  } catch (error) {
    console.log(error);
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
exports.updateCommentStatus = async (req, res, next) => {
  const { commentId, newStatus } = req.body;
  let result;
  try {
    result = await Comment.update(
      { status: newStatus },
      { where: { id: commentId } }
    );

    if (!result) {
      const error = new Error("updating unsuccesfull");
      error.statusCode = 500;
      throw error;
    }
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
exports.clearComment = async (req, res, next) => {
  const commentId = req.params.commentId;
  try {
    const commentToDelete = await Comment.findOne({
      where: { id: commentId },
    });
    const result = await commentToDelete.destroy();
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
exports.clearAllSoldDrugs = (req, res, next) => {
  console.log(req.params);
  const drugsCode = req.params.drugCodes;

  const drugCodes = drugsCode.split(":");
  drugCodes.shift();
  try {
    SoldDrug.destroy({ where: { drugCode: drugCodes } });
  } catch (error) {}
};
exports.sendOrder = (req, res, next) => {
  const date = new Date();
  let { storeRequest } = req.body;
  try {
    storeRequest = storeRequest.map((request) => {
      request.requestDate = date;
      return request;
    });
    StoreOrder.bulkCreate(storeRequest, { validate: true });
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
exports.orderDrugs = async (req, res, next) => {
  const { storeOrders } = req.body;
  try {
    await ManagerOrder.bulkCreate(storeOrders, { validate: true });
    res.json({ status: "success" });
  } catch (error) {
    res.json({ status: "fail" });
  }
};
exports.clearStoreRequest = async (req, res, next) => {
  try {
    const result = await StoreRequest.destroy({ truncate: true });
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
