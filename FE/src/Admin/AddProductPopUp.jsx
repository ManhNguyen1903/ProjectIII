import React, { useState, useEffect } from "react";
import "./AddProductPopUp.css";
import { category } from "../Data";

const AddProductPopup = ({ isOpen, onClose, onUpdate }) => {
  const [image, setImage] = useState(null); // State để lưu đường dẫn ảnh
  const [productData, setProductData] = useState({
    type: "",
    name: "",
    price: "",
    note: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  // Reset state khi pop-up được mở lại
  useEffect(() => {
    if (!isOpen) {
      setImage(null);
      setProductData({
        type: "",
        name: "",
        price: "",
        note: "",
      });
      setSuccessMessage(""); // Reset thông báo thành công
    }
  }, [isOpen]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productData.name || !productData.price) {
      alert("Vui lòng điền đầy đủ thông tin sản phẩm!");
      return;
    }

    const newProduct = {
      id: Date.now(), // Tạo ID duy nhất cho sản phẩm
      ...productData,
      image,
    };
    // Cập nhật danh sách sản phẩm cho Admin.js
    onUpdate(newProduct);

    // Hiển thị thông báo thành công
    setSuccessMessage("Sản phẩm đã được lưu thành công!");

    // Đóng pop-up sau khi lưu
    setTimeout(() => {
      setSuccessMessage(""); // Reset thông báo sau khi đóng
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-add_product">
        <h2>Thêm sản phẩm</h2>
        <form onSubmit={handleSubmit}>
          {successMessage && <div className="success-message">{successMessage}</div>}

          <div>
            <label>Loại:</label>
            <select
              type="text"
              name="category"
              value={productData.category}
              onChange={handleChange}
              list="categories-list" // Gắn danh sách gợi ý
            >
              <option value="">-- Chọn loại sản phẩm --</option>
              {category.map((item) => (
                <option key={item.id} value={item.category}>
                  {item.category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Tên sản phẩm:</label>
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Giá:</label>
            <input
              type="text"
              name="price"
              value={productData.price}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Chú thích:</label>
            <textarea
              name="note"
              value={productData.note}
              onChange={handleChange}
            ></textarea>
          </div>

          <div>
            <input
              type="file"
              accept="image/*"
              id="imageInput"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <div
              className="image-placeholder"
              onClick={() => document.getElementById("imageInput").click()}
            >
              {image ? (
                <img
                  src={image}
                  alt="Preview"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                "Ảnh sản phẩm"
              )}
            </div>
          </div>

          <div className="button-group">
          <button className="close-button" onClick={onClose}>&times;</button>
            <button type="submit" className="save-button">
              Lưu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductPopup;
