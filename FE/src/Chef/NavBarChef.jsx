import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./NavbarChef.css";

function NavbarChef() {
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
        <div className="navbar-profile">
          Nhân viên bếp
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
    </nav>
  );
}

export default NavbarChef;
