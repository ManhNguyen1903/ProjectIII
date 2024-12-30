import React, { useState, useEffect } from "react";
import axios from "axios";
import AddEmployeePopup from "./AddEmployeePopup"; // Modal thêm nhân viên
import EditEmployeePopup from "./EditEmployeePopup"; // Modal sửa thông tin nhân viên
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./EmployeeList.css";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Điều khiển modal thêm nhân viên
  const [selectedEmployee, setSelectedEmployee] = useState(null); // Dữ liệu nhân viên được chọn
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Điều khiển modal sửa nhân viên
  const apiUrl = "http://localhost:8017/api/employees";

  // Lấy danh sách nhân viên khi component được mount
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(apiUrl);
        setEmployees(response.data); // Đảm bảo response chứa đủ dữ liệu
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []); // Chạy khi component lần đầu tiên được render

  // Thêm nhân viên mới
  const handleAddEmployee = async (newEmployee) => {
    try {
      const response = await axios.post(apiUrl, newEmployee);
      setEmployees((prev) => [...prev, response.data]); // Cập nhật danh sách nhân viên
      setIsAddModalOpen(false); // Đóng modal sau khi thêm
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  // Mở modal chỉnh sửa nhân viên
  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    setIsEditModalOpen(true);
  };

  // Cập nhật thông tin nhân viên
  const handleEditEmployee = async (updatedEmployee) => {
    try {
      const response = await axios.put(
        `${apiUrl}/${updatedEmployee._id}`,
        updatedEmployee
      );
      setEmployees((prevEmployees) =>
        prevEmployees.map((emp) =>
          emp._id === updatedEmployee._id ? response.data : emp
        )
      );
      setIsEditModalOpen(false); // Đóng modal sau khi sửa
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  // Xóa nhân viên
  const handleDeleteEmployee = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      setEmployees((prevEmployees) =>
        prevEmployees.filter((emp) => emp._id !== id)
      );
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <div className="employee-list">
      <div className="navbar-addEmployee">
        <h2>Quản lý nhân viên</h2>
        <button
          className="add-employee-icon"
          onClick={() => setIsAddModalOpen(true)}
        >
          <FontAwesomeIcon icon={faPlus} size="2x" />
        </button>
      </div>

      <div className="table-container">
        {employees.length === 0 ? (
          <p>Không có nhân viên nào trong danh sách.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th> {/* Cột ID thêm vào */}
                <th>Tên</th>
                <th>Số điện thoại</th>
                <th>Tên NH</th>
                <th>STK</th>
                <th>Ca làm</th>
                <th>Lương</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr
                  key={employee._id}
                  onClick={() => handleEditClick(employee)} // Thêm sự kiện onClick cho toàn bộ dòng
                >
                  <td>{index + 1}</td> {/* ID bắt đầu từ 1 */}
                  <td>{employee.fullname}</td>
                  <td>{employee.phoneNumber}</td> {/* Sử dụng phoneNumber */}
                  <td>{employee.bankInfo.bankName}</td> {/* Sử dụng bankInfo.bankName */}
                  <td>{employee.bankInfo.bankNumber}</td> {/* Sử dụng bankInfo.bankNumber */}
                  <td>{employee.time}</td> {/* Sử dụng time thay shift */}
                  <td>{employee.salary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal thêm nhân viên */}
      {isAddModalOpen && (
        <AddEmployeePopup
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddEmployee}
        />
      )}

      {/* Modal sửa thông tin nhân viên */}
      {isEditModalOpen && selectedEmployee && (
        <EditEmployeePopup
          employee={selectedEmployee}
          onClose={() => setIsEditModalOpen(false)}
          onEdit={handleEditEmployee}
          onDelete={handleDeleteEmployee}
        />
      )}
    </div>
  );
};

export default EmployeeList;
