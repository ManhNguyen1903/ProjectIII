import React, { useState, useEffect } from "react";
import "./EditCategory.css"; // Tạo file CSS riêng nếu cần

const EditCategory = ({ isOpen, category, onClose, onUpdate, onDelete }) => {
  const [categoryName, setCategoryName] = useState("");

  // Đồng bộ hóa tên danh mục khi `category` thay đổi
  useEffect(() => {
    if (category) {
      setCategoryName(category.name || "");
    }
  }, [category]);

  // Cập nhật tên danh mục
  const handleUpdate = () => {
    if (!categoryName.trim()) {
      alert("Tên danh mục không được để trống!");
      return;
    }
    onUpdate({ ...category, name: categoryName });
    onClose();
  };

  // Xóa danh mục
  const handleDelete = () => {
    if (
      window.confirm(
        `Bạn có chắc chắn muốn xóa danh mục "${category.name}" không?`
      )
    ) {
      onDelete(category._id);
      onClose();
    }
  };

  // Nếu không mở hoặc không có danh mục được chọn, không hiển thị
  if (!isOpen || !category) return null;

  return (
    <div className="popup-overlay-category">
      <div className="popup-edit-category">
        <div className="navbar-editCategory">
          <h2>Chỉnh sửa danh mục</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>

        {/* Form chỉnh sửa danh mục */}
        <div className="form-group">
          <label>Tên danh mục:</label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Nhập tên danh mục"
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
