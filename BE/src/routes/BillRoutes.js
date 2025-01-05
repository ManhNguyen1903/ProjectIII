const express = require('express');
const router = express.Router();
const billController = require('../controllers/BillController');

router.post("/", billController.createBill); // Tạo hóa đơn
router.get("/table/:idTable", billController.getBillByTableId); // lấy bill theo bàn
router.get("/", billController.getBills); // Lấy danh sách hóa đơn
router.get("/:id", billController.getBillById); // Lấy hóa đơn theo ID
router.patch("/:id", billController.updateProductBill); // Cập nhật hóa đơn
// router.put("/:id", billController.updateBill); // Cập nhật hóa đơn
router.delete("/:id", billController.deleteBill); // Xóa hóa đơn

module.exports = router;
