const coordinatorController = require("../controllers/coordinator");
const router = require("express").Router();

router.get("/drugs", coordinatorController.getDrugs);

router.patch("/drug", coordinatorController.updateDrug);

router.delete("/drug/:drugId", coordinatorController.deleteDrug);

router.delete("/drugs/:drugIds", coordinatorController.deleteDrugs);

router.post("/drugs/request", coordinatorController.addRequest);

router.post("/drugs/register", coordinatorController.registerDrugs);

router.post("/drugs/order", coordinatorController.addToStock);

router.delete("/request", coordinatorController.clearStockRequest);

module.exports = router;
