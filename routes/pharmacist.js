const pharmacistContoller = require("../controllers/pharmacist");

const router = require("express").Router();

router.get("/drugs", pharmacistContoller.getDrugs);

router.patch("/drug", pharmacistContoller.sellDrug);

router.delete("/drug/:drugCode", pharmacistContoller.deleteDrug);

router.delete("/drugs/:drugsCode", pharmacistContoller.deleteDrugs);

router.post("/drugs/request", pharmacistContoller.requestDrug);

router.post("/drugs/register", pharmacistContoller.acceptOrders);

router.get("/search/:searchKey", pharmacistContoller.searchDrug);

module.exports = router;

module.exports = router;
