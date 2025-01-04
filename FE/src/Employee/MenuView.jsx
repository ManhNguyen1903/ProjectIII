import React, { useState, useEffect } from "react";
import "./MenuView.css";
import axios from "axios";

function MenuView({ onAddProduct }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeFilter, setActiveFilter] = useState("Tất cả");

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
            onClick={() => onAddProduct(product)} // Gọi hàm khi nhấn vào sản phẩm
          >
            <img src={product.image} alt={product.name} />
            <div className="name">{product.name}</div>
            <div className="price">{product.price.toLocaleString("vi-VN")}₫</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuView;

