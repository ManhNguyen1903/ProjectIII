import React, { useState, useEffect } from "react";
import "./AddCategory.css";

const AddCategory = ({ isOpen, onClose, onUpdate }) => {
  const [CategoryData, setCategoryData] = useState({
    name: "",
    note: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  // Reset state khi pop-up được mở lại
  useEffect(() => {
    if (!isOpen) {
      setCategoryData({
        name: "",
        note: "",
      });
      setSuccessMessage(""); // Reset thông báo thành công
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({ ...CategoryData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!CategoryData.name.trim()) {
      alert("Vui lòng nhập tên danh mục!");
      return;
    }

    const newCategory = {
      id: Date.now(), // Tạo ID duy nhất cho danh mục
      ...CategoryData,
    };

    // Cập nhật danh sách danh mục
    onUpdate(newCategory);

    // Hiển thị thông báo thành công
    setSuccessMessage("Danh mục đã được lưu thành công!");

    // Đóng pop-up sau khi lưu
    setTimeout(() => {
      setSuccessMessage(""); // Reset thông báo sau khi đóng
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay-category">
      <div className="popup-add-category">
        <div className="navbar-addCategory">
          <h2>Thêm danh mục</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>

        <form onSubmit={handleSubmit}>
          {successMessage && <div className="success-message">{successMessage}</div>}

          <div>
            <label>Tên danh mục:</label>
            <input
              type="text"
              name="name"
              value={CategoryData.name}
              onChange={handleChange}
              placeholder="Nhập tên danh mục"
            />
          </div>

          <div>
            <label>Chú thích:</label>
            <textarea
              name="note"
              value={CategoryData.note}
              onChange={handleChange}
              placeholder="Nhập chú thích (nếu có)"
            ></textarea>
          </div>

          <div className="button-group">
            <button type="submit" className="save-button">
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
