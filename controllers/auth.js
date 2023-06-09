const Account = require("../models/accounts");
const bcrypt = require("bcrypt");
exports.logIn = async (req, res, next) => {
  const { username, password } = req.body;
  let user = undefined;
  try {
    const accounts = await Account.findAll({});
    const hashPassword = await bcrypt.hash("admin", 12);
    if (accounts.length == 0) {
      adminAccount = await Account.create({
        active: true,
        firstName: "admin ",
        lastName: "admin",
        date: new Date(),
        accountId: `admin${Date.now().toString()}`,
        role: "admin",
        username: "admin",
        password: hashPassword,
      });

      await adminAccount.save();
    }
    user = await Account.findOne({ where: { username: username } });
    if (!user) {
      return res.json({
        auth: false,
        user: { username: undefined, role: undefined },
        message: "Invalid username !",
      });
    }

    const passwortMatch = await bcrypt.compare(password, user.password);
    if (!passwortMatch) {
      return res.json({
        auth: false,
        user,
        message: "Invalid Password !",
      });
    }
    if (!user.active) {
      return res.json({
        auth: false,
        user,
        message: "account suspended for while!",
      });
    }
    res.json({
      auth: true,
      user: { username: user.username, role: user.role },
    });
  } catch (error) {
    console.log(error);
    return res.json({
      auth: false,
      user: { username: undefined, role: undefined },
      message: "Authentication failed !",
    });
  }
};
