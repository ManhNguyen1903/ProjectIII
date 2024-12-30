import React, { useState } from "react";
import "./AddEmployeePopup.css";

const AddEmployeePopup = ({ onClose, onAdd }) => {
  const [employee, setEmployee] = useState({
    fullname: "",
    phoneNumber: "",
    bankInfo: {
      bankName: "",
      bankNumber: "",
    },
    time: "", // Ca làm (time)
    salary: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Xử lý trường hợp có object bankInfo
    if (name.includes("bankInfo")) {
      const field = name.split(".")[1]; // Lấy phần bankName hoặc bankNumber
      setEmployee({
        ...employee,
        bankInfo: { ...employee.bankInfo, [field]: value },
      });
    } else {
      setEmployee({ ...employee, [name]: value });
    }
  };

  const handleAdd = () => {
    // Kiểm tra dữ liệu đầu vào
    if (!employee.fullname || !employee.phoneNumber || !employee.salary) {
      setError("Vui lòng điền đầy đủ các trường bắt buộc!");
      return;
    }
    setError(""); // Xóa lỗi nếu dữ liệu hợp lệ

    onAdd(employee); // Gửi dữ liệu nhân viên lên component cha
    onClose(); // Đóng popup sau khi thêm
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h3>Thêm nhân viên</h3>
        {error && <p className="error-message">{error}</p>} {/* Hiển thị lỗi */}
        
        {/* Các trường nhập liệu */}
        <div className="form-group">
          <label>Tên:</label>
          <input
            name="fullname"
            placeholder="Tên nhân viên"
            value={employee.fullname}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Số điện thoại:</label>
          <input
            name="phoneNumber"
            placeholder="Số điện thoại"
            value={employee.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Tên NH:</label>
          <input
            name="bankInfo.bankName"
            placeholder="Tên ngân hàng"
            value={employee.bankInfo.bankName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>STK:</label>
          <input
            name="bankInfo.bankNumber"
            placeholder="Số tài khoản"
            value={employee.bankInfo.bankNumber}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Ca làm:</label>
          <input
            name="time"
            placeholder="Ca làm"
            value={employee.time}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Lương:</label>
          <input
            name="salary"
            placeholder="Lương"
            value={employee.salary}
            onChange={handleChange}
          />
        </div>

        <div className="popup-buttons">
          <button className="cancel-button" onClick={onClose}>
            Hủy
          </button>
          <button className="add-button" onClick={handleAdd}>
            Thêm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeePopup;
