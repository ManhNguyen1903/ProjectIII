const Account = require('../models/Account');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// Đăng ký
exports.register = async (req, res) => {
  const { username, password, confirmPassword, fullname, role } = req.body;

  try {
    // Kiểm tra mật khẩu khớp
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Mật khẩu và xác nhận mật khẩu không khớp' });
    }

    // Danh sách vai trò hợp lệ
    const roles = ['Admin', 'Nhân viên order', 'Nhân viên bếp', 'Nhân viên chạy bàn'];
    if (!roles.includes(role)) {
      return res.status(400).json({ message: 'Vai trò không hợp lệ' });
    }

    // Kiểm tra username tồn tại
    const existingUser = await Account.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Tên đăng nhập đã tồn tại' });
    }

    // Tạo tài khoản mới
    const newAccount = new Account({ username, password, fullname, role });
    await newAccount.save();

    res.status(201).json({ message: 'Đăng ký thành công' });
  } catch (err) {
    res.status(500).json({ message: 'Có lỗi xảy ra', error: err.message });
  }
};

// Đăng nhập
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const account = await Account.findOne({ username });
    if (!account) {
      return res.status(404).json({ message: 'Tài khoản không tồn tại' });
    }

    // Kiểm tra mật khẩu
    const isPasswordValid = await account.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Mật khẩu không đúng' });
    }

    // Tạo JWT Token
    const token = jwt.sign(
      { id: account._id, role: account.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, role: account.role, fullname: account.fullname });
  } catch (err) {
    res.status(500).json({ message: 'Có lỗi xảy ra', error: err.message });
  }
};

// Lấy danh sách vai trò (roles)
exports.getRoles = (req, res) => {
  const roles = ['Admin', 'Nhân viên order', 'Nhân viên bếp', 'Nhân viên chạy bàn'];
  res.status(200).json(roles); // Trả về danh sách roles
};
