const express = require("express");
const router = express.Router();
const billController = require("../controllers/BillController");

router.get("/", billController.getBill);
router.put("/:billId", billController.updateBill);

module.exports = router;
