const express = require("express");
const router = express.Router();
const controller = require("../controllers/transactionController");

router.post("/", controller.addTransaction);
router.get("/", controller.getTransactions);
router.put("/:id", controller.updateTransaction);
router.delete("/:id", controller.deleteTransaction);

module.exports = router;
