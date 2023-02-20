const Account = require("../models/accounts");

exports.logIn = async (req, res, next) => {
  console.log("dddddd");
  const { username, password } = req.body;
  console.log(req.body);
  let user = undefined;
  try {
    user = await Account.findOne({ where: { email: username } });
    if (!user) {
      return res.json({
        auth: false,
        user,
        message: "Invalid username !",
      });
    }
    if (password != user.password) {
      return res.json({
        auth: false,
        user,
        message: "Invalid Password !",
      });
    }
    res.json({
      auth: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      auth: false,
      user,
      message: "Authentication failed !",
    });
  }
};
