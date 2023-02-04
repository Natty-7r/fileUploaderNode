const pharmacistContoller = require("../controllers/pharmacist");

const router = require("express").Router();

router.get("/drugs", pharmacistContoller.getDrugs);

router.patch("/drug", pharmacistContoller.sellDrug);

router.delete("/drug/:drugId", pharmacistContoller.deleteDrug);

router.delete("/drugs/:drugIds", pharmacistContoller.deleteDrugs);

router.post("/drugs/request", pharmacistContoller.requestDrug);

router.post("/drugs/register", pharmacistContoller.acceptOrders);

// router.post("/drugs/order", pharmacistContoller.addToStock);

module.exports = router;

module.exports = router;
