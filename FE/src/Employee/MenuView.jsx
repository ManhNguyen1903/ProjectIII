import React, { useState, useEffect } from "react";
import "./MenuView.css";
import axios from "axios";

function MenuView({ onAddProduct }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeFilter, setActiveFilter] = useState("Tất cả");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [note, setNote] = useState("");

  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        const productResponse = await axios.get("http://localhost:8017/api/products");
        const categoryResponse = await axios.get("http://localhost:8017/api/categories");
        setProducts(productResponse.data);
        setCategories(["Tất cả", ...categoryResponse.data.map((category) => category.name)]);
      } catch (error) {
        console.error("Error fetching products or categories:", error);
      }
    };

    fetchProductsAndCategories();
  }, []);

  const filteredProducts =
    activeFilter === "Tất cả"
      ? products
      : products.filter((product) => product.category.name === activeFilter);

  const handleConfirmAdd = () => {
    if (selectedProduct) {
      onAddProduct({ ...selectedProduct, note });
      setSelectedProduct(null); // Đóng popup
      setNote(""); // Reset ghi chú
    }
  };

  const handleCancel = () => {
    setSelectedProduct(null); // Đóng popup
    setNote(""); // Reset ghi chú
  };

  return (
    <div className="view">
      <div className="category">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-item ${
              activeFilter === category ? "active" : ""
            }`}
            onClick={() => setActiveFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="menu">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="menu-item"
            onClick={() => setSelectedProduct(product)} // Hiển thị popup khi chọn sản phẩm
          >
            <img src={product.image} alt={product.name} />
            <div className="name">{product.name}</div>
            <div className="price">{product.price.toLocaleString("vi-VN")}₫</div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="popup">
          <div className="popup-content">
            <h3>Thêm sản phẩm: {selectedProduct.name}</h3>
            <label htmlFor="note" className="note-label">
              Nhập ghi chú:
            </label>
            <input
              type="text"
              id="note"
              className="note-input"
              placeholder="Nhập ghi chú (nếu có)"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <div className="popup-buttons">
              <button className="confirm-button" onClick={handleConfirmAdd}>
                Xác nhận
              </button>
              <button className="cancel-button" onClick={handleCancel}>
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default MenuView;
