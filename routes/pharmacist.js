const pharmacistContoller = require("../controllers/pharmacist");
const router = require("express").Router();

router.get("/drugs", pharmacistContoller.getDrugs);

router.patch("/drug", pharmacistContoller.updateDrug);

router.delete("/drug/:drugId", pharmacistContoller.deleteDrug);

router.delete("/drugs/:drugIds", pharmacistContoller.deleteDrugs);

module.exports = router;
