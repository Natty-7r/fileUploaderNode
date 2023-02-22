const { Op, where } = require("sequelize");

const Comment = require("../models/comments");

const StoreOrder = require("../models/storeOrder");

const Request = require("../models/request");

const RequestDrug = require("../models/requestedDrugs");

exports.getIndex = async (req, res, next) => {
  try {
    const pendingOrders = await Request.findAll({
      where: {
        [Op.and]: [{ status: "pending" }, { sender: "manager" }],
      },
      include: RequestDrug,
    });
    const acceptedOrders = await Request.findAll({
      where: {
        [Op.and]: [{ status: "accepted" }, { sender: "manager" }],
      },
      include: RequestDrug,
    });
    const rejectedOrders = await Request.findAll({
      where: {
        [Op.and]: [{ status: "rejected" }, { sender: "manager" }],
      },
      include: RequestDrug,
    });
    const comments = await Comment.findAll({
      where: { sender: "supplier" },
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
        comments,
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
        comments: [],
      },
    });
  }
};

exports.addComment = async (req, res, next) => {
  let { message, username } = req.body;
  try {
    const comment = new Comment({
      name: username,
      sender: "supplier",
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
    res.json({
      status: "fail",
      message: "error while sending requst to manager",
    });
  }
};

exports.chageOrderStatus = async (req, res, next) => {
  const { requestId, status } = req.body;

  try {
    await Request.update({ status: status }, { where: { id: requestId } });
    res.json({ status: "success" });
  } catch (error) {
    res.json({ status: "fail" });
  }
};

exports.sendOrder = async (req, res, next) => {
  const { orders } = req.body;
  try {
    const savedDrug = await StoreOrder.bulkCreate(orders, { validate: true });
    if (!savedDrug) {
      const error = new Error("updating unsuccesfull");
      error.statusCode = 500;
      throw error;
    }
    res.json({ status: "success" });
  } catch (error) {
    console.log(error);
    res.json({ status: "fail" });
  }
};

exports.clearOrder = async (req, res, next) => {
  const requestId = req.params.requestId;
  try {
    const result = await Request.destroy({ where: { id: requestId } });

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
