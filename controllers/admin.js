const Store = require("../models/store");
const Stock = require("../models/stock");
const SoldDrug = require("../models/soldDrugs");
const Comment = require("../models/comments");

const StoreOrder = require("../models/storeOrder");
const Request = require("../models/request");
const RequestDrug = require("../models/requestedDrugs");

exports.getDrugs = async (req, res, next) => {
  try {
    const storeDrugs = await Store.findAll({});
    const stockDrugs = await Stock.findAll({});

    const soldDrugs = await SoldDrug.findAll({});
    const storeRequests = await Request.findAll({
      where: { sender: "coordinator" },
      include: RequestDrug,
    });
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

exports.orderDrugs = async (req, res, next) => {
  const { storeOrders } = req.body;

  try {
    await Request.create(
      {
        sender: "manager",
        status: "pending",
        requestDate: new Date(),
        requestedDrugs: storeOrders,
      },
      {
        include: [RequestDrug],
      }
    );
    res.json({ status: "success" });
  } catch (error) {
    res.json({ status: "fail" });
  }
};
exports.clearStoreRequest = async (req, res, next) => {
  try {
    const result = await Request.destroy({
      where: {
        sender: "coordinator",
      },
    });
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
