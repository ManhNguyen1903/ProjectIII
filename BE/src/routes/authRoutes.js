const express = require('express');
const { register, login, getRoles } = require('../controllers/authController'); // Import đầy đủ controller
const { verifyToken, authorizeRoles } = require('../middlewares/auth');

const router = express.Router();

// Route đăng ký
router.post('/register', register);

// Route đăng nhập
router.post('/login', login);

// Route lấy danh sách vai trò
router.get('/roles', getRoles); // Thêm route để trả về roles

// Ví dụ route cần xác thực
router.get('/admin', verifyToken, authorizeRoles(['Admin']), (req, res) => {
  res.json({ message: 'Welcome Admin' });
});

module.exports = router;
