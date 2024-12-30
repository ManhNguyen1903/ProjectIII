import React, { useState } from "react";
import "./Admin.css";
import NavBarAdmin from "./NavBarAdmin";
import { products as initialProducts } from "../Data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AddProductPopup from "./AddProductPopUp";
import ProductDetailPopup from "./ProductDetailPopup.jsx"; // Import popup chi tiết sản phẩm
import CategoryManagement from "./Category.jsx"
import TableAdminView from "./TableAdminView";
import AddTablePopup from "./AddTablePopup";
import EditTablePopup from "./EditTablePopup";
import EmployeeList from "./EmployeeList";

function Admin() {
  const [activeMenu, setActiveMenu] = useState("Quản lý sản phẩm");
  const [activeFilter, setActiveFilter] = useState("Tất cả");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // Lưu sản phẩm được chọn
  const [products, setProducts] = useState(initialProducts);

  // Lấy danh mục sản phẩm từ dữ liệu
  const categories = ["Tất cả", ...new Set(products.map((product) => product.category))];

  // Lọc sản phẩm theo danh mục
  const filteredProducts =
    activeFilter === "Tất cả"
      ? products
      : products.filter((product) => product.category === activeFilter);

  // Thêm sản phẩm mới
  const handleAddProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  // Cập nhật sản phẩm
  const handleUpdateProduct = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    setSelectedProduct(null); // Đóng popup sau khi lưu
  };

  // Xóa sản phẩm
  const handleDeleteProduct = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
    setSelectedProduct(null); // Đóng popup sau khi xóa
  };
    
  const [tables, setTables] = useState([
    { id: 1, name: "Bàn 1", status: "empty" },
    { id: 2, name: "Bàn 2", status: "occupied" },
  ]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");

  const handleAddTable = (newTable) => {
    setTables((prevTables) => [...prevTables, newTable]);
  };

  const handleEditTable = (updatedTable) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === updatedTable.id ? updatedTable : table
      )
    );
  };

  const handleDeleteTable = (id) => {
    setTables((prevTables) => prevTables.filter((table) => table.id !== id));
    setSelectedTable(null);
  };

  return (
    <div className="admin-container">
      {/* Navbar trên cùng */}
      <NavBarAdmin />

      <div className="admin-body">
        {/* Menu bên trái */}
        <div className="sidebar">
          <ul>
            <button
              className={activeMenu === "Quản lý sản phẩm" ? "active" : ""}
              onClick={() => setActiveMenu("Quản lý sản phẩm")}
            >
              Quản lý sản phẩm
            </button>
            <button
              className={activeMenu === "Quản lý danh mục" ? "active" : ""}
              onClick={() => setActiveMenu("Quản lý danh mục")}
            >
              Quản lý danh mục
            </button>
            <button
              className={activeMenu === "Quản lý nhân viên" ? "active" : ""}
              onClick={() => setActiveMenu("Quản lý nhân viên")}
            >
              Quản lý nhân viên
            </button>
            <button
              className={activeMenu === "Quản lý bàn" ? "active" : ""}
              onClick={() => setActiveMenu("Quản lý bàn")}
            >
              Quản lý bàn
            </button>

            <button
              className={activeMenu === "Lịch sử giao dịch" ? "active" : ""}
              onClick={() => setActiveMenu("Lịch sử giao dịch")}
            >
              Lịch sử giao dịch
            </button>
            <button
              className={activeMenu === "Doanh thu" ? "active" : ""}
              onClick={() => setActiveMenu("Doanh thu")}
            >
              Doanh thu
            </button>
          </ul>
        </div>

        {/* Nội dung chính */}
        <div className="main-content">
          {activeMenu === "Quản lý sản phẩm" && (
            <div className="product-management">
              <div className="header-container">
                {/* Bộ lọc sản phẩm */}
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

                {/* Nút thêm sản phẩm */}
                <button
                  className="add-product-icon"
                  onClick={() => setIsModalOpen(true)}
                >
                  <FontAwesomeIcon icon={faPlus} size="4x" />
                </button>

                {/* Popup thêm sản phẩm */}
                <AddProductPopup
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  onUpdate={handleAddProduct}
                />
              </div>

              {/* Danh sách sản phẩm */}
              <div className="product-grid">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="product-card"
                    onClick={() => setSelectedProduct(product)} // Hiển thị popup chi tiết sản phẩm
                  >
                    <img src={product.image} alt={product.name} />
                    <div className="product-info">
                      <p className="product-name">{product.name}</p>
                      <p className="product-price">{product.price} VNĐ</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Popup chi tiết sản phẩm */}
              {selectedProduct && (
                <ProductDetailPopup
                  product={selectedProduct}
                  onClose={() => setSelectedProduct(null)}
                  onUpdate={handleUpdateProduct}
                  onDelete={handleDeleteProduct} // Truyền hàm xóa
                />
              )}
              
            </div>
          )}
          {activeMenu === "Quản lý danh mục" && <CategoryManagement />}
          
          {activeMenu === "Quản lý nhân viên" && <EmployeeList />}

          {activeMenu === "Quản lý bàn" && (
            <div>
              <div className="navbar-table"> 
                <h2>Quản lý bàn</h2>
                <button
                  className="add-table-icon"
                  onClick={() => setIsAdding(true)}
                >
                  <FontAwesomeIcon icon={faPlus} size="2x" />
                </button>
                {isAdding && (
                <AddTablePopup onClose={() => setIsAdding(false)} onAdd={handleAddTable} />
              )}
              </div>
              <TableAdminView
                tables={tables}
                onTableSelect={setSelectedTable}
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
              />
              

              {selectedTable && (
                <EditTablePopup
                  table={selectedTable}
                  onClose={() => setSelectedTable(null)}
                  onEdit={handleEditTable}
                  onDelete={handleDeleteTable}
                />
              )}
            </div>
          )}
          {activeMenu === "Lịch sử giao dịch" && (
            <div>
              <h2>Lịch sử giao dịch</h2>
              <p>Nội dung hiển thị lịch sử giao dịch...</p>
            </div>
          )}
          {activeMenu === "Doanh thu" && (
            <div>
              <h2>Doanh thu</h2>
              <p>Nội dung hiển thị doanh thu...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;
