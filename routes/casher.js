const casherController = require("../controllers/cashier");
const router = require("express").Router();

router.get("/index", casherController.getIndex);

router.post("/account", casherController.createAccount);

router.delete("/account/:accountId", casherController.deleteAccount);

router.patch("/account/", casherController.changAccountState);

router.put("/account", casherController.updateAccount);

module.exports = router;
