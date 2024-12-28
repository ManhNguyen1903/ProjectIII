import React, { useState } from "react";
import EditEmployeePopup from "./EditEmployeePopup";
import "./EmployeeList.css"; // Thêm CSS tùy chỉnh

const EmployeeList = ({ employees, setEmployees }) => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleEditEmployee = (updatedEmployee) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((emp) =>
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      )
    );
    setSelectedEmployee(null); // Đóng popup sau khi sửa
  };

  const handleDeleteEmployee = (id) => {
     {
      setEmployees((prevEmployees) =>
        prevEmployees.filter((emp) => emp.id !== id)
      );
      setSelectedEmployee(null); // Đóng popup sau khi xóa
    }
  };

  return (
    <div className="employee-list">
      <h2>Danh sách nhân viên</h2>
      {employees.length === 0 ? ( // Kiểm tra danh sách nhân viên trống
        <p>Không có nhân viên nào trong danh sách.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Tên</th>
              <th>Số điện thoại</th>
              <th>Tên NH</th>
              <th>STK</th>
              <th>Ca làm</th>
              <th>Lương</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td
                  className="clickable"
                  onClick={() => setSelectedEmployee(employee)}
                >
                  {employee.name}
                </td>
                <td>{employee.phone}</td>
                <td>{employee.bankname}</td>
                <td>{employee.stk}</td>
                <td>{employee.shift}</td>
                <td>{employee.salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedEmployee && (
        <EditEmployeePopup
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
          onEdit={handleEditEmployee}
          onDelete={handleDeleteEmployee}
        />
      )}
    </div>
  );
};

export default EmployeeList;
