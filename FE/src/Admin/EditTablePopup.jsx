import React, { useState } from "react";
import "./EditTablePopup.css";

function EditTablePopup({ table, onClose, onEdit, onDelete }) {
  const [tableName, setTableName] = useState(table.name);

  const handleEdit = () => {
    if (tableName.trim()) {
      onEdit({ ...table, name: tableName });
      onClose();
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Chỉnh sửa bàn</h2>
        <input
          type="text"
          value={tableName}
          onChange={(e) => setTableName(e.target.value)}
          placeholder="Nhập tên bàn"
        />
        <div className="popup-buttons">
        <button className="delete-button" onClick={() => onDelete(table.id)}>Xóa</button>
        <button className="save-button" onClick={handleEdit}>Lưu</button>
        <button className="close-button" onClick={onClose}>&times;</button>
        </div>

      </div>
    </div>
  );
}

export default EditTablePopup;
