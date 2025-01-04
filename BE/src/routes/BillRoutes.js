const express = require('express');
const router = express.Router();
const billController = require('../controllers/BillController');

router.get('/', billController.getAllBills);
router.get('/:id', billController.getBillById);
router.post('/', billController.createBill);
router.put('/:id', billController.updateBillStatus);

module.exports = router;
