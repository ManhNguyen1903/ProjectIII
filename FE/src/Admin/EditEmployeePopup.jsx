import React, { useState } from "react";
import "./EditEmployeePopup.css";

const EditEmployeePopup = ({ employee, onClose, onEdit, onDelete }) => {
  const [updatedEmployee, setUpdatedEmployee] = useState({ ...employee });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Kiểm tra nếu là các trường trong bankInfo
    if (name.includes("bankInfo")) {
      const field = name.split(".")[1]; // Lấy phần bankName hoặc bankNumber
      setUpdatedEmployee({
        ...updatedEmployee,
        bankInfo: { ...updatedEmployee.bankInfo, [field]: value },
      });
    } else {
      setUpdatedEmployee({ ...updatedEmployee, [name]: value });
    }
  };

  const handleEdit = () => {
    // Kiểm tra các trường bắt buộc
    if (!updatedEmployee.fullname || !updatedEmployee.phoneNumber || !updatedEmployee.salary) {
      alert("Tên, Số điện thoại và Lương là bắt buộc!");
      return;
    }
    onEdit(updatedEmployee); // Gửi dữ liệu đã sửa về component cha
    onClose(); // Đóng popup sau khi sửa
  };

  const handleDelete = () => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa nhân viên ${updatedEmployee.fullname}?`)) {
      onDelete(updatedEmployee._id); // Gửi ID để xóa nhân viên trong component cha
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
            name="fullname"
            value={updatedEmployee.fullname}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Số điện thoại:</label>
          <input
            name="phoneNumber"
            value={updatedEmployee.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Tên NH:</label>
          <input
            name="bankInfo.bankName"
            value={updatedEmployee.bankInfo.bankName || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>STK:</label>
          <input
            name="bankInfo.bankNumber"
            value={updatedEmployee.bankInfo.bankNumber || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Ca làm:</label>
          <input
            name="time"
            value={updatedEmployee.time || ""}
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
