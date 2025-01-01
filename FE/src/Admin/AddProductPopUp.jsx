import React, { useState, useEffect } from "react";
import "./AddProductPopUp.css";

const AddProductPopup = ({ isOpen, onClose, onUpdate, existingProduct }) => {
  const [image, setImage] = useState(null); // State để lưu đường dẫn ảnh
  const [productData, setProductData] = useState({
    category: "", // Loại sản phẩm
    name: "",
    price: "",
    note: "",
  });
  const [categories, setCategories] = useState([]); // Lưu trữ danh sách danh mục
  const [successMessage, setSuccessMessage] = useState(""); // Thông báo lưu thành công

  // Gọi API lấy danh sách danh mục khi mở popup
  useEffect(() => {
    if (isOpen) {
      // Gọi API để lấy danh mục từ backend
      fetch("http://localhost:8017/api/categories")
        .then((response) => response.json())
        .then((data) => {
          setCategories(data); // Cập nhật danh mục trong state
          
          // Nếu là sửa sản phẩm, điền dữ liệu cũ vào form
          if (existingProduct) {
            setProductData({
              name: existingProduct.name,
              price: existingProduct.price,
              category: existingProduct.category._id, // Đảm bảo sử dụng _id cho category
              note: existingProduct.note,
            });
            setImage(existingProduct.image); // Set hình ảnh nếu có
          } else {
            // Reset các trường thông tin nếu không phải chỉnh sửa
            setProductData({
              category: "", 
              name: "",
              price: "",
              note: "",
            });
            setImage(null);
          }
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    }
  }, [isOpen, existingProduct]); // Chạy khi isOpen hoặc existingProduct thay đổi

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

    // Kiểm tra nếu người dùng chưa điền đủ thông tin
    if (!productData.name || !productData.price || !productData.category) {
      alert("Vui lòng điền đầy đủ thông tin sản phẩm!");
      return;
    }

    const newProduct = {
      ...productData,
      image,
    };

    if (existingProduct) {
      // Cập nhật sản phẩm (chỉnh sửa sản phẩm hiện tại)
      onUpdate(newProduct, existingProduct._id); // Giả sử onUpdate sẽ xử lý việc cập nhật
    } else {
      // Thêm sản phẩm mới
      onUpdate(newProduct); // Giả sử onUpdate sẽ xử lý việc thêm mới
    }

    // Hiển thị thông báo thêm thành công
    setSuccessMessage("Sản phẩm đã được thêm thành công!");

    // Đóng popup sau khi lưu dữ liệu và reset thông báo
    setTimeout(() => {
      setSuccessMessage(""); // Reset thông báo sau khi đóng
      onClose(); // Đóng popup
    }, 700);
  };

  if (!isOpen) return null; // Nếu popup không mở thì không hiển thị gì

  return (
    <div className="popup-overlay">
      <div className="popup-add_product">
        <h2>{existingProduct ? "Sửa sản phẩm" : "Thêm sản phẩm"}</h2>
        <form onSubmit={handleSubmit}>
          {successMessage && <div className="success-message">{successMessage}</div>}

          <div>
            <label>Loại:</label>
            <select
              type="text"
              name="category"
              value={productData.category}
              onChange={handleChange}
            >
              <option value="">-- Chọn loại sản phẩm --</option>
              {categories.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name} {/* Hiển thị tên danh mục */}
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
              Thêm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductPopup;
