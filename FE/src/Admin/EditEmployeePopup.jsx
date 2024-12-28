import React, { useState } from "react";
import "./EditEmployeePopup.css";

const EditEmployeePopup = ({ employee, onClose, onEdit, onDelete }) => {
  const [updatedEmployee, setUpdatedEmployee] = useState({ ...employee });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedEmployee({ ...updatedEmployee, [name]: value });
  };

  const handleEdit = () => {
    if (!updatedEmployee.name || !updatedEmployee.phone) {
      alert("Tên và Số điện thoại là bắt buộc!");
      return;
    }
    onEdit(updatedEmployee); // Gửi dữ liệu sửa đổi ra component cha
    onClose(); // Đóng popup sau khi sửa
  };

  const handleDelete = () => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa nhân viên ${employee.name}?`)) {
      onDelete(employee.id); // Gửi ID để xóa nhân viên trong component cha
      onClose(); // Đóng popup sau khi xóa
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h3>Sửa thông tin nhân viên</h3>
        <div className="form-group">
          <label>Tên:</label>
          <input
            name="name"
            value={updatedEmployee.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Số điện thoại:</label>
          <input
            name="phone"
            value={updatedEmployee.phone}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Tên NHNH:</label>
          <input
            name="bankname"
            value={updatedEmployee.bankname || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>STK:</label>
          <input
            name="stk"
            value={updatedEmployee.stk || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Ca làm:</label>
          <input
            name="shift"
            value={updatedEmployee.shift || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Lương:</label>
          <input
            name="salary"
            value={updatedEmployee.salary || ""}
            onChange={handleChange}
          />
        </div>
        <div className="popup-buttons">
          <button className="delete-button" onClick={handleDelete}>
            Xóa
          </button>
          <button className="save-button" onClick={handleEdit}>
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEmployeePopup;
