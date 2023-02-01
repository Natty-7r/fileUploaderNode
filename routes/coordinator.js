const coordinatorController = require("../controllers/coordinator");
const router = require("express").Router();

router.get("/drugs", coordinatorController.getDrugs);

router.patch("/drug", coordinatorController.updateDrug);

router.delete("/drug/:drugId", coordinatorController.deleteDrug);

router.delete("/drugs/:drugIds", coordinatorController.deleteDrugs);

router.post("/request", coordinatorController.addRequest);
router.post("/drugs/store", coordinatorController.registerDrugs);

module.exports = router;
