import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Navbar.css";

function Navbar({ currentView, setCurrentView, activeButton, handleClick }) {
  const navigate = useNavigate(); // Hook để điều hướng

  const handleLogout = () => {
    const confirmLogout = window.confirm("Bạn có chắc chắn muốn đăng xuất?");
    if (confirmLogout) {
      // Xử lý đăng xuất
      localStorage.removeItem("authToken");
      navigate("/"); // Điều hướng về trang đăng nhập
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a
          href="#phongban"
          className={`navbar-item-table ${currentView === "phongban" ? "active" : ""} ${
            activeButton === 1 ? "active" : ""
          }`}
          onClick={() => {
            setCurrentView("phongban");
            handleClick(1);
          }}
        >
          Phòng bàn
        </a>
        <a
          href="#thucdon"
          className={`navbar-item ${currentView === "thucdon" ? "active" : ""} ${
            activeButton === 2 ? "active" : ""
          }`}
          onClick={() => {
            setCurrentView("thucdon");
            handleClick(2);
          }}
        >
          Thực đơn
        </a>
        <input type="text" className="navbar-search" placeholder="Tìm sản phẩm" />
      </div>
      <div className="navbar-right">
        <a
          href="#giaodich"
          className={`navbar-item-bill ${currentView === "giaodich" ? "active" : ""} ${
            activeButton === 3 ? "active" : ""
          }`}
          onClick={() => {
            setCurrentView("giaodich");
            handleClick(3);
          }}
        >
          Giao dịch - Mã giao dịch
        </a>
        <div className="navbar-profile">
          Nhân viên
          <div className="dropdown">
            <button className="dropbtn">☰</button>
            <div className="dropdown-content">
              <a href="#">Cài đặt</a>
              <a href="#" onClick={handleLogout}>
                Đăng xuất
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
