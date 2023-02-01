const Store = require("../models/store");
const StoreOrder = require("../models/toStore");
const Requests = require("../models/request");

exports.getDrugs = async (req, res, next) => {
  try {
    const drugs = await Store.find({}).sort({ expireDate: -1 });
    // const expiredDrugs = await Store.find({}).sort({ expireDate: -1 });
    const now = new Date();
    const expiredDrugs = drugs.filter((drug) => {
      return now > drug.expireDate;
    });
    const availbleDrugs = drugs.filter((drug) => {
      return now < drug.expireDate;
    });

    const storeOrders = await StoreOrder.find({}).sort({ expireDate: -1 });
    if (!drugs) {
      const error = new Error("unable to load drugs");
      error.statusCode = 500;
      throw error;
    }

    res.json({
      status: "success",
      drugs: { availbleDrugs, expiredDrugs, storeOrders },
    });
  } catch (error) {}
};
exports.updateDrug = async (req, res, next) => {
  const { drugId, newPrice, newAmount } = req.body;
  try {
    const result = await Store.updateOne(
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
  let { requests } = req.body;
  requests = requests.map((request) => {
    request.date = date;
    return request;
  });
  console.log(requests[0]);
  Requests.insertMany(requests);
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
