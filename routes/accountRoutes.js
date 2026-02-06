const express = require("express");
const router = express.Router();
const controller = require("../controllers/accountController");

router.get("/", controller.getAccounts);
router.post("/transfer", controller.transferMoney);

module.exports = router;
