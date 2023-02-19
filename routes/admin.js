const managerController = require("../controllers/manager");
const router = require("express").Router();

router.get("/drugs", managerController.getDrugs);

router.patch("/comment", managerController.updateCommentStatus);

router.delete("/comment/:commentId", managerController.clearComment);

router.post("/drugs/order", managerController.orderDrugs);

router.delete("/request", managerController.clearStoreRequest);

module.exports = router;
