const Employee = require('../models/Employee');

// Lấy tất cả nhân viên
async function getAllEmployees() {
  return await Employee.find();
}

// Lấy một nhân viên theo ID
async function getEmployeeById(id) {
  return await Employee.findById(id);
}
 
// Tạo mới một nhân viên
async function createEmployee(data) {
  const employee = new Employee(data);
  return await employee.save();
}

// Cập nhật thông tin nhân viên
async function updateEmployee(id, updates) {
  return await Employee.findByIdAndUpdate(id, updates, { new: true });
}

// Xóa nhân viên
async function deleteEmployee(id) {
  return await Employee.findByIdAndDelete(id);
}

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
