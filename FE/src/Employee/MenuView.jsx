import React, { useState } from "react";
import "./MenuView.css"; // Create and style this as needed
import { products } from "../Data";

function MenuView({ onAddProduct }) {
  const [activeFilter, setActiveFilter] = useState("Tất cả");

  const categories = ["Tất cả", ...new Set(products.map((product) => product.category))];

  const filteredProducts =
    activeFilter === "Tất cả"
      ? products
      : products.filter((product) => product.category === activeFilter);

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
            key={product.id}
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

