const managerController = require("../controllers/manager");
const router = require("express").Router();

router.get("/drugs", managerController.getDrugs);

router.patch("/drug", managerController.updateDrug);

router.delete("/drug/:drugCode", managerController.deleteDrug);

router.delete("/drugs/:drugCodes", managerController.deleteDrugs);

router.post("/drugs/request", managerController.addRequest);

router.post("/drugs/register", managerController.registerDrugs);

router.post("/drugs/order", managerController.addToStock);

router.delete("/request", managerController.clearStockRequest);

module.exports = router;
