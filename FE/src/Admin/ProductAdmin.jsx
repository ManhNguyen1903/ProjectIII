import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AddProductPopup from "./AddProductPopUp";
import ProductDetailPopup from "./ProductDetailPopup";
import axios from "axios";

const ProductAdmin = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeFilter, setActiveFilter] = useState("Tất cả");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Fetch sản phẩm và danh mục từ API
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

  // Lọc sản phẩm theo danh mục
  const filteredProducts =
    activeFilter === "Tất cả"
      ? products
      : products.filter((product) => product.category.name === activeFilter);

  // Thêm sản phẩm
  const handleAddProduct = async (newProduct) => {
    try {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("price", newProduct.price);
      formData.append("category", newProduct.category);
      formData.append("description", newProduct.description);
      if (newProduct.image) formData.append("image", newProduct.image);

      const response = await axios.post("http://localhost:8017/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProducts((prevProducts) => [...prevProducts, response.data]);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8017/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  

  const handleUpdateProduct = async (updatedProduct) => {
    try {
      await axios.put(`http://localhost:8017/api/products/${updatedProduct._id}`, updatedProduct);
      fetchProducts(); // Lấy danh sách mới
      setSelectedProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };
  
  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:8017/api/products/${productId}`);
      fetchProducts(); // Lấy danh sách mới
      setSelectedProduct(null);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  

  // Đóng popup khi sản phẩm bị xóa
  useEffect(() => {
    if (selectedProduct && !products.find((p) => p._id === selectedProduct._id)) {
      setSelectedProduct(null);
    }
  }, [products, selectedProduct]);

  return (
    <div className="product-management">
      <div className="header-container">
        <div className="filter">
          {categories.map((category) => (
            <button
              key={category}
              className={activeFilter === category ? "active" : ""}
              onClick={() => setActiveFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <button className="add-product-icon" onClick={() => setIsModalOpen(true)}>
          <FontAwesomeIcon icon={faPlus} size="2x" />
        </button>
        <AddProductPopup
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onUpdate={handleAddProduct}
          categories={categories.filter((cat) => cat !== "Tất cả")}
        />
      </div>
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div key={product._id} className="product-card" onClick={() => setSelectedProduct(product)}>
            <img
              src={product.image || "path/to/default/image.jpg"}
              alt={product.name}
              className="product-image"
            />
            <div className="product-info">
              <p className="product-name">{product.name}</p>
              <p className="product-price">{product.price} VNĐ</p>
            </div>
          </div>
        ))}
      </div>
      {selectedProduct && (
        <ProductDetailPopup
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onUpdate={handleUpdateProduct}
          onDelete={handleDeleteProduct}
        />
      )}
    </div>
  );
};

export default ProductAdmin;
