import React, { useState, useEffect } from "react";
import "./EditTablePopup.css";

function EditTablePopup({ table, onClose, onEdit, onDelete }) {
  const [updatedTable, setUpdatedTable] = useState({ ...table });

  // Cập nhật các trường trong bảng
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTable({ ...updatedTable, [name]: value });
  };

  // Cập nhật tên bàn
  const handleEdit = () => {
    onEdit(updatedTable);  // Gửi dữ liệu đã sửa về component cha
    onClose();  // Đóng popup sau khi cập nhật
  };

  // Xóa bàn
  const handleDelete = () => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa bàn ${updatedTable.tableName}?`)) {
      onDelete(updatedTable._id);  // Gửi ID để xóa bàn trong component cha
      onClose();  // Đóng popup sau khi xóa
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h3>Chỉnh sửa bàn</h3>
        
        {/* Tên bàn */}
        <div className="form-group">
          <label>Tên bàn:</label>
          <input
            name="tableName"
            value={updatedTable.tableName}
            onChange={handleChange}
          />
        </div>

        {/* Các trường khác nếu cần */}
        <div className="form-group">
          <label>Trạng thái:</label>
          <input
            name="status"
            value={updatedTable.status || ""}
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
}

export default EditTablePopup;
