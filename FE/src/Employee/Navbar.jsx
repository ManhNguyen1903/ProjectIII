import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';  // Cài đặt thư viện axios để gọi API
import "./Navbar.css";

function Navbar({ currentView, setCurrentView, activeButton, handleClick }) {
  const navigate = useNavigate();

  const [totalAmount, setTotalAmount] = useState(0);
  const [transactions, setTransactions] = useState([]); // Lưu trữ danh sách giao dịch
  const [startDate, setStartDate] = useState(""); // Lưu trữ ngày bắt đầu
  const [endDate, setEndDate] = useState(""); // Lưu trữ ngày kết thúc
  const [startHour, setStartHour] = useState("00"); // Lưu trữ giờ bắt đầu (default là 00:00)
  const [endHour, setEndHour] = useState("23"); // Lưu trữ giờ kết thúc (default là 23:59)

  // Fetch dữ liệu từ MongoDB thông qua API
  const fetchTransactionData = async () => {
    try {
      const response = await axios.get('http://localhost:8017/api/bills'); // Địa chỉ API lấy dữ liệu
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]; // Format to "YYYY-MM-DD"
    setStartDate(today);
    setEndDate(today);

    fetchTransactionData();
  }, []);

  const filterTransactionsByDateAndTime = () => {
    if (!startDate || !endDate) return transactions; // Không lọc nếu không có ngày bắt đầu hoặc kết thúc

    const filteredTransactions = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.dateCheckIn); // Giả sử bạn có trường 'dateCheckIn' chứa ngày giao dịch
      const startDateTime = new Date(`${startDate}T${startHour}:00`);
      const endDateTime = new Date(`${endDate}T${endHour}:59`);

      return transactionDate >= startDateTime && transactionDate <= endDateTime;
    });

    return filteredTransactions;
  };

  const calculateTotalAmount = (filteredTransactions) => {
    const total = filteredTransactions.reduce((acc, transaction) => {
      if (transaction.status === "paid") {
        return acc + transaction.totalPrice; // Thêm totalPrice của giao dịch "paid"
      }
      return acc;
    }, 0);
    setTotalAmount(total);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Bạn có chắc chắn muốn đăng xuất?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      navigate("/"); // Điều hướng về trang đăng nhập
    }
  };

  const handleShowStatistics = () => {
    const filteredTransactions = filterTransactionsByDateAndTime();
    calculateTotalAmount(filteredTransactions);
    alert(`Tổng số tiền từ giao dịch trong khoảng thời gian: ${totalAmount.toLocaleString()} VNĐ`);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a
          href="#phongban"
          className={`navbar-item-table ${currentView === "phongban" ? "active" : ""} ${activeButton === 1 ? "active" : ""}`}
          onClick={() => {
            setCurrentView("phongban");
            handleClick(1);
          }}
        >
          Phòng bàn
        </a>
        <a
          href="#thucdon"
          className={`navbar-item ${currentView === "thucdon" ? "active" : ""} ${activeButton === 2 ? "active" : ""}`}
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
          className={`navbar-item-bill ${currentView === "giaodich" ? "active" : ""} ${activeButton === 3 ? "active" : ""}`}
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
              <label>
                Từ:
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </label>
              <label>
                Giờ bắt đầu:
                <input
                  type="time"
                  value={`${startHour}:00`}
                  onChange={(e) => setStartHour(e.target.value.split(":")[0])}
                />
              </label>
              <label>
                Đến:
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </label>
              <label>
                Giờ kết thúc:
                <input
                  type="time"
                  value={`${endHour}:59`}
                  onChange={(e) => setEndHour(e.target.value.split(":")[0])}
                />
              </label>
              <a href="#" onClick={handleShowStatistics}>
                Thống kê
              </a>
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
