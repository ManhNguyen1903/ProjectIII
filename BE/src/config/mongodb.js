
const mongoose = require('mongoose');
require('dotenv').config(); // Nạp biến môi trường từ file .env

const connectDB = async () => {
  try {
    const mongoURL = process.env.MONGODB_URI;
    const dbName = process.env.DATABASE_NAME || 'defaultDB';

    await mongoose.connect(mongoURL, {
      dbName: dbName, // Nếu cần kết nối đến một DB cụ thể
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ Kết nối MongoDB Atlas thành công tới cơ sở dữ liệu "${dbName}"!`);
  } catch (error) {
    console.error(`❌ Lỗi kết nối MongoDB: ${error.message}`);
    process.exit(1); // Dừng ứng dụng nếu kết nối thất bại
  }
};

module.exports = connectDB;

