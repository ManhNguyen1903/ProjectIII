const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const accountSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullname: { type: String, required: true },
  role: {
    type: String,
    enum: ['Admin', 'Nhân viên order', 'Nhân viên bếp', 'Nhân viên chạy bàn'],
    required: true,
  },
}, { timestamps: true });

// Mã hóa mật khẩu trước khi lưu
accountSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// So sánh mật khẩu
accountSchema.methods.comparePassword = function (plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};

module.exports = mongoose.model('Account', accountSchema);
