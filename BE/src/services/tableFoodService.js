const TableFood = require("../models/TableFood");

// Lấy tất cả bàn
exports.getAllTables = async () => {
  return await TableFood.find();
};

// Thêm bàn mới
exports.createTable = async (tableData) => {
  const newTable = new TableFood(tableData);
  return await newTable.save();
};

// Sửa thông tin bàn
exports.updateTable = async (id, tableData) => {
  return await TableFood.findByIdAndUpdate(id, tableData, { new: true });
};

// Xóa bàn
exports.deleteTable = async (id) => {
  return await TableFood.findByIdAndDelete(id);
};
