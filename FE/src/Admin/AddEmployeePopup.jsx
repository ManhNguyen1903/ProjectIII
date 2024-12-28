import React, { useState } from "react";
import "./AddEmployeePopup.css";

const AddEmployeePopup = ({ onClose, onAdd }) => {
  const [employee, setEmployee] = useState({
    name: "",
    phone: "",
    bankname: "",
    stk: "",
    shift: "",
    salary: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleAdd = () => {
    // Kiểm tra dữ liệu đầu vào
    if (!employee.name || !employee.phone || !employee.salary) {
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
        <div className="form-group">
          <label>Tên:</label>
          <input
            name="name"
            placeholder="Tên nhân viên"
            value={employee.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Số điện thoại:</label>
          <input
            name="phone"
            placeholder="Số điện thoại"
            value={employee.phone}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Tên NH:</label>
          <input
            name="bankname"
            placeholder="Tên ngân hàng"
            value={employee.bankname}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>STK:</label>
          <input
            name="stk"
            placeholder="Số tài khoản"
            value={employee.stk}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Ca làm:</label>
          <input
            name="shift"
            placeholder="Ca làm"
            value={employee.shift}
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
