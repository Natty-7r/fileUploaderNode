const Store = require("../models/store");
const Stock = require("../models/stock");

const StockOrder = require("../models/stockOrder");
const StoreOrder = require("../models/storeOrder");

const StoreRequest = require("../models/storeRequest");
const StockRequest = require("../models/stockRequest");

exports.getDrugs = async (req, res, next) => {
  try {
    const storeDrugs = await Store.find({}).sort({ expireDate: -1 });
    const stockDrugs = await Stock.find({}).sort({ expireDate: -1 });

    const now = new Date();
    const expiredDrugs = storeDrugs.filter((drug) => {
      return now > drug.expireDate;
    });
    const availbleStoreDrugs = storeDrugs.filter((drug) => {
      return now < drug.expireDate;
    });

    const availbleStockDrugs = stockDrugs.filter((drug) => {
      return now < drug.expireDate;
    });

    const storeOrders = await StoreOrder.find({}).sort({ expireDate: -1 });
    if (!storeDrugs) {
      const error = new Error("unable to load drugs");
      error.statusCode = 500;
      throw error;
    }

    res.json({
      status: "success",
      drugs: {
        availbleStockDrugs,
        availbleStoreDrugs,
        expiredDrugs,
        storeOrders,
      },
    });
  } catch (error) {}
};
exports.updateDrug = async (req, res, next) => {
  const { drugId, newPrice, newAmount, currentSlide } = req.body;
  let result;
  try {
    if (currentSlide == "availableStore")
      result = await Store.updateOne(
        { _id: drugId },
        { price: newPrice, amount: newAmount }
      );

    if (currentSlide == "availableStock")
      result = await Stock.updateOne(
        { _id: drugId },
        { price: newPrice, amount: newAmount }
      );

    if (!result.acknowledged) {
      const error = new Error("updating unsuccesfull");
      error.statusCode = 500;
      throw error;
    }
    res.json({ status: "success" });
  } catch (error) {}
};
exports.deleteDrug = async (req, res, next) => {
  const drugId = req.params.drugId;

  try {
    const result = await Store.deleteOne({ _id: drugId });
    if (!result.deletedCount == 0) {
      const error = new Error("deleting unsuccesfull");
      error.statusCode = 500;
      throw error;
    }
    res.json({ status: "success" });
  } catch (error) {}
};

exports.deleteDrugs = (req, res, next) => {
  console.log(req.params);
  const drugId = req.params.drugIds;
  const drugIds = drugId.split(":");
  drugIds.shift();
  console.log(drugIds);

  drugIds.forEach((drugId) => {
    Store.deleteOne({ _id: drugId })
      .then((result) => {
        if (!result.deletedCount == 0) {
          const error = new Error("deleting unsuccesfull");
          error.statusCode = 500;
          throw error;
        }
      })
      .catch((error) => {});
  });
};
exports.addRequest = (req, res, next) => {
  const date = new Date();
  let { storeRequest } = req.body;
  try {
    storeRequest = storeRequest.map((request) => {
      request.requestDate = date;
      return request;
    });
    StoreRequest.insertMany(storeRequest);
  } catch (error) {
    console.log("error while sending requst to manager ");
  }
};
exports.registerDrugs = async (req, res, next) => {
  try {
    await Store.deleteMany({});
    const newDrugs = req.body.newDrugs.map((drug) => {
      delete drug._id;
      return drug;
    });
    await Store.insertMany(newDrugs);
    await StoreOrder.deleteMany({});
  } catch (error) {}
};
exports.addToStock = async (req, res, next) => {
  const { stockOrders, availbleDrugs } = req.body;

  try {
    await Store.deleteMany({});

    const updatedAvailableDrugs = availbleDrugs.map((drug) => {
      delete drug._id;
      return drug;
    });

    await Store.insertMany(updatedAvailableDrugs);
    await StockOrder.insertMany(stockOrders);
  } catch (error) {}
};
