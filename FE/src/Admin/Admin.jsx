import React, { useState } from "react";
import "./Admin.css";
import NavBarAdmin from "./NavBarAdmin";
import CategoryManagement from "./Category.jsx"
import TableAdminView from "./TableAdminView";
import EmployeeList from "./EmployeeList";
import ProductAdmin from "./ProductAdmin";
import TransactionHistory from "./TransactionHistory";
import RevenueChart from "./RevenueChart.jsx"

function Admin() {
  const [activeMenu, setActiveMenu] = useState("Quản lý sản phẩm");

 
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
              Thống kê doanh thu
            </button>
          </ul>
        </div>

        {/* Nội dung chính */}
        <div className="main-content">
          {activeMenu === "Quản lý sản phẩm" && <ProductAdmin />}

          {activeMenu === "Quản lý danh mục" && <CategoryManagement />}
          
          {activeMenu === "Quản lý nhân viên" && <EmployeeList />}

          {activeMenu === "Quản lý bàn" && <TableAdminView />}

          {activeMenu === "Lịch sử giao dịch" && <TransactionHistory />}

          {activeMenu === 'Doanh thu' && <RevenueChart />}
        </div>
      </div>
    </div>
  );
}

export default Admin;
