const express = require('express');
const EmployeeController = require('../controllers/EmployeeController');

const router = express.Router();

// Lấy danh sách nhân viên
router.get('/', EmployeeController.getAllEmployees);

// Lấy thông tin một nhân viên theo ID
router.get('/:id', EmployeeController.getEmployeeById);

// Tạo mới nhân viên
router.post('/', EmployeeController.createEmployee);

// Cập nhật thông tin nhân viên
router.put('/:id', EmployeeController.updateEmployee);

// Xóa nhân viên
router.delete('/:id', EmployeeController.deleteEmployee);

module.exports = router;
