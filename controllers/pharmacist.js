const Stock = require("../models/stock");

exports.getDrugs = async (req, res, next) => {
  try {
    const drugs = await Stock.find({}).sort({ expireDate: -1 });
    if (!drugs) {
      const error = new Error("unable to load drugs");
      error.statusCode = 500;
      throw error;
    }

    res.json({ status: "success", drugs });
  } catch (error) {}
};

exports.sellDrug = async (req, res, next) => {
  const { drugId, newAmount } = req.body;
  try {
    const result = await Stock.updateOne(
      { _id: drugId },
      { amount: newAmount }
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
    const result = await Stock.deleteOne({ _id: drugId });
    if (!result.deletedCount == 0) {
      const error = new Error("deleting unsuccesfull");
      error.statusCode = 500;
      throw error;
    }
    res.json({ status: "success" });
  } catch (error) {}
};
exports.deleteDrugs = (req, res, next) => {
  const drugId = req.params.drugIds;
  const drugIds = drugId.split(":");
  drugIds.shift();
  console.log(drugIds);

  drugIds.forEach((drugId) => {
    Stock.deleteOne({ _id: drugId })
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
