const Drug = require("../models/drug");

exports.getDrugs = async (req, res, next) => {
  try {
    const drugs = await Drug.find({ state: "store" });
    if (!drugs) {
      const error = new Error("unable to load drugs");
      error.statusCode = 500;
      throw error;
    }

    res.json({ status: "success", drugs });
  } catch (error) {}
};
exports.updateDrug = async (req, res, next) => {
  const { drugId, newPrice, newAmount } = req.body;
  try {
    const result = await Drug.updateOne(
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
    const result = await Drug.deleteOne({ _id: drugId });
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
    Drug.deleteOne({ _id: drugId })
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
