const { Op } = require("sequelize");
const SoldDrug = require("../models/soldDrugs");

const Account = require("../models/accounts");

exports.getIndex = async (req, res, next) => {
  try {
    const yestedayTime = Date.now() - 24 * 3600 * 1000;
    const yesteday = new Date(yestedayTime);

    const unbilledDrugs = await SoldDrug.findAll({
      where: {
        status: "unbilled",
      },
    });
    const billedToday = await SoldDrug.findAll({
      where: {
        [Op.and]: [
          {
            status: "billed",
          },
          {
            updatedAt: {
              [Op.gt]: yesteday,
            },
          },
        ],
      },
    });

    res.json({
      status: "success",
      unbilledDrugs,
      billedToday,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: "fail",
      message: "unable to fetch data",
      unbilledDrugs: [],
      billedToday: [],
    });
  }
};
exports.createAccount = async (req, res, next) => {
  const { account } = req.body;
  let userAcccount = undefined;
  try {
    userAcccount = await Account.findOne({
      where: { username: account.username },
    });
    if (userAcccount) {
      const error = new Error();
      error.message = "User with the username Already Exists !";
      error.statusCode = 500;
      throw error;
    }
    account.date = new Date();
    account.accountId = `user${Date.now().toString()}`;
    userAcccount = await Account.create(account);
    userAcccount = await userAcccount.save();

    if (!userAcccount) {
      const error = new Error();
      error.message = "Failed to Create User !";
      error.statusCode = 500;
      throw error;
    }
    res.json({ status: "success", userAcccount });
  } catch (error) {
    res.json({ status: "fail", message: error.message });
  }
};
exports.deleteAccount = async (req, res, next) => {
  const accountId = req.params.accountId;
  console.log(accountId);

  try {
    const result = await Account.destroy({
      where: { accountId: accountId },
    });
    if (!result) {
      const error = new Error("deleting unsuccesfull");
      error.statusCode = 500;
      throw error;
    }
    res.json({ status: "success" });
  } catch (error) {
    console.log(error);
    res.json({ status: "fail", message: error.message });
  }
};

exports.changAccountState = async (req, res, next) => {
  const { accountId, active } = req.body;
  console.log(req.body);

  try {
    const result = await Account.update(
      {
        active: active,
      },
      {
        where: { accountId: accountId },
      }
    );
    if (!result) {
      const error = new Error();
      error.message = "update unsuccessful";
      throw error;
    }
    res.json({ status: "success" });
  } catch (error) {
    // console.log(error);
    res.json({ status: "fail", message: error.message });
  }
};

exports.updateAccount = async (req, res, next) => {
  const { firstName, lastName, username, role, active, password, accountId } =
    req.body;

  try {
    const result = await Account.update(
      {
        firstName: firstName,
        lastName: lastName,
        username: username,
        role: role,
        active: active,
        password: password,
      },
      {
        where: {
          accountId: accountId,
        },
      }
    );
    if (!result) {
      const error = new Error("updating  unsuccesfull");
      throw error;
    }

    res.json({ status: "success" });
  } catch (error) {
    console.log(error);
    res.json({ status: "fail" });
  }
};
