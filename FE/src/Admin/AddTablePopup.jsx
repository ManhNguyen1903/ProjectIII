import React, { useState } from "react";
import "./AddTablePopup.css";

function AddTablePopup({ onClose, onAdd }) {
  const [tableName, setTableName] = useState("");

  // Xử lý khi thêm bàn
  const handleAdd = () => {
    if (tableName.trim()) {
      onAdd({
        tableName,      // Gửi thông tin tên bàn
        status: "empty", // Mặc định trạng thái là "empty"
      });
      onClose(); // Đóng popup sau khi thêm bàn
    } else {
      alert("Tên bàn không được để trống!");
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Thêm bàn mới</h2>
        <input
          type="text"
          value={tableName}
          onChange={(e) => setTableName(e.target.value)}
          placeholder="Nhập tên bàn"
        />
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
}

export default AddTablePopup;
