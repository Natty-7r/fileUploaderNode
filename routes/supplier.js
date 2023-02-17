const supplierContoller = require("../controllers/supplier");

const router = require("express").Router();

router.get("/index", supplierContoller.getIndex);

router.patch("/drug", supplierContoller.sellDrug);

router.delete("/drug/:drugCode", supplierContoller.deleteDrug);

router.delete("/drugs/:drugsCode", supplierContoller.deleteDrugs);

router.post("/drugs/request", supplierContoller.requestDrug);

router.post("/drugs/register", supplierContoller.acceptOrders);

// router.post("/drugs/order", supplierContoller.addToStock);

module.exports = router;

module.exports = router;
