const EmployeeService = require('../services/EmployeeService');

// Lấy danh sách nhân viên
async function getAllEmployees(req, res) {
  try {
    const employees = await EmployeeService.getAllEmployees();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Lấy một nhân viên theo ID
async function getEmployeeById(req, res) {
  try {
    const { id } = req.params;
    const employee = await EmployeeService.getEmployeeById(id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Tạo mới một nhân viên
async function createEmployee(req, res) {
  try {
    const data = req.body;
    const employee = await EmployeeService.createEmployee(data);
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Cập nhật thông tin nhân viên
async function updateEmployee(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedEmployee = await EmployeeService.updateEmployee(id, updates);
    if (!updatedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Xóa nhân viên
async function deleteEmployee(req, res) {
  try {
    const { id } = req.params;
    const deletedEmployee = await EmployeeService.deleteEmployee(id);
    if (!deletedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
