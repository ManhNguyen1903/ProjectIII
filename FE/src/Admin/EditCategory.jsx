import React, { useState, useEffect } from "react";
import "./EditCategory.css"; // Tạo file CSS riêng nếu cần

const EditCategory = ({ isOpen, category, onClose, onUpdate, onDelete }) => {
  const [categoryName, setCategoryName] = useState("");

  // Cập nhật category name khi modal mở và có category được chọn
  useEffect(() => {
    if (category) {
      setCategoryName(category.name);
    }
  }, [category]);

  // Cập nhật tên danh mục
  const handleUpdate = () => {
    if (!categoryName.trim()) {
      alert("Tên danh mục không được để trống!");
      return;
    }
    onUpdate({ ...category, name: categoryName }); // Gọi hàm onUpdate để cập nhật danh mục
    onClose();
  };

  // Xóa danh mục
  const handleDelete = () => {
    onDelete(category._id); // Gọi hàm onDelete để xóa danh mục
    onClose();
  };

  if (!isOpen || !category) return null;

  return (
    <div className="popup-overlay-category">
      <div className="popup-edit-category">
        <div className="navbar-editCategory">
          <h2>Chỉnh sửa danh mục</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>

        <div>
          <label>Tên danh mục:</label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>
        <div className="button-group">
          <button className="delete-button" onClick={handleDelete}>
            Xóa
          </button>
          <button className="save-button" onClick={handleUpdate}>
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCategory;
