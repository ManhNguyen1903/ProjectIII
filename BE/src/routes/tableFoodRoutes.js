const express = require("express");
const router = express.Router();
const tableFoodController = require("../controllers/tableFoodController");

// Lấy danh sách tất cả bàn
router.get("/", tableFoodController.getTables);

// Thêm bàn mới
router.post("/", tableFoodController.addTable);

// Sửa thông tin bàn
router.put("/:id", tableFoodController.updateTable);

// Xóa bàn
router.delete("/:id", tableFoodController.deleteTable);

module.exports = router;
