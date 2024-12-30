const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');

// Định nghĩa các API endpoint
router.get('/', CategoryController.getAllCategories);       // Lấy tất cả danh mục
router.get('/:id', CategoryController.getCategoryById);    // Lấy danh mục theo ID
router.post('/', CategoryController.createCategory);       // Tạo danh mục mới
router.put('/:id', CategoryController.updateCategory);     // Cập nhật danh mục theo ID
router.delete('/:id', CategoryController.deleteCategory);  // Xóa danh mục theo ID

module.exports = router;
