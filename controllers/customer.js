const { Op } = require("sequelize");

const Store = require("../models/store");
const Stock = require("../models/stock");
const Comment = require("../models/comments");

exports.searchDrug = async (req, res, next) => {
  try {
    let searchKey = req.params.searchKey;
    let searchResult = [];

    const searchResultStock = await Stock.findAll({
      where: { name: { [Op.like]: `%${searchKey}%` } },
    });
    const searchResultStore = await Store.findAll({
      where: { name: { [Op.like]: `%${searchKey}%` } },
    });

    searchResult = searchResultStock.concat(searchResultStore);
    return res.json({
      status: "success",
      searchResult,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: "fail",
      message: "unable to fetch data",
      searchResult: [],
    });
  }
};

exports.addComment = async (req, res, next) => {
  let { name, message, email } = req.body;
  try {
    const comment = new Comment({
      name: name,
      sender: "customer",
      email: email,
      message,
      commentDate: new Date(),
      status: "unread",
    });
    const commentSaved = await comment.save();

    if (!commentSaved) {
      const error = new Error("ddd");
      throw error;
    }
    res.json({ status: "success" });
  } catch (error) {
    console.log(error);
    res.json({
      status: "fail",
      message: "error while sending requst to manager",
    });
  }
};
