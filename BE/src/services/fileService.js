const path = require('path');

// Định nghĩa thư mục lưu trữ ảnh
const storagePath = path.join(__dirname, '../uploads');

module.exports = {
  getStoragePath: () => storagePath,
};
