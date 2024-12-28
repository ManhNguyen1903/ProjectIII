import React, { useState, useEffect } from "react";
import "./ProductDetailPopup.css";

const ProductDetailPopup = ({ product, onClose, onUpdate, onDelete }) => {
  const [editableProduct, setEditableProduct] = useState(null);

  // Khởi tạo dữ liệu sản phẩm khi `product` thay đổi
  useEffect(() => {
    if (product) {
      setEditableProduct({ ...product });
    }
  }, [product]);

  // Nếu chưa có sản phẩm để chỉnh sửa, không hiển thị popup
  if (!editableProduct) return null;

  // Xử lý khi người dùng thay đổi thông tin sản phẩm
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Lưu thay đổi sản phẩm
  const handleSave = () => {
    onUpdate(editableProduct); // Gọi hàm `onUpdate` từ lớp cha với sản phẩm đã chỉnh sửa
    onClose(); // Đóng popup
  };

  // Xóa sản phẩm
  const handleDelete = () => {
    onDelete(editableProduct.id); // Gọi hàm `onDelete` từ lớp cha với ID sản phẩm
    onClose(); // Đóng popup
  };

  return (
    <div className="popup-overlay">
      <div className="popup-add_product">
        <div className="header">
          <h2>Chi tiết sản phẩm</h2>
          <button type="button" className="close-button-productdetail" onClick={onClose}>
            &times;
          </button>
        </div>

        {/* Form chỉnh sửa sản phẩm */}
        <div>
          <label>Loại:</label>
          <input
            type="text"
            name="category"
            value={editableProduct.category}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Tên sản phẩm:</label>
          <input
            type="text"
            name="name"
            value={editableProduct.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Giá:</label>
          <input
            type="number"
            name="price"
            value={editableProduct.price}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Chú thích:</label>
          <textarea
            name="note"
            value={editableProduct.note || ""}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Ảnh sản phẩm:</label>
          <div className="image-placeholder">
            {editableProduct.image ? (
              <img
                src={editableProduct.image}
                alt="Product"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              "Không có ảnh"
            )}
          </div>
        </div>

        {/* Nút hành động */}
        <div className="button-group">
          <button type="button" className="delete-button" onClick={handleDelete}>
            Xóa
          </button>
          <button type="button" className="save-button" onClick={handleSave}>
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPopup;
