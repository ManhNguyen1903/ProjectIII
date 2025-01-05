import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Waiter.css";
import NavbarWaiter from "./NavBarWaiter";
import PopUpBillComplete from "./PopUpBillComplete";

const Waiter = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedBill, setSelectedBill] = useState(null); // State cho popup

  useEffect(() => {
    const fetchCompletedBills = async () => {
      setLoading(true);
      setError("");

      try {
        // Lấy toàn bộ hóa đơn
        const response = await axios.get("http://localhost:8017/api/bills");

        // Lọc danh sách hóa đơn có trạng thái là "complete"
        const completedBills = response.data.filter((bill) => bill.status === "complete");

        setBills(completedBills);
      } catch (error) {
        setError(error.message || "Đã xảy ra lỗi.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedBills();
  }, []); // Chỉ lấy hóa đơn khi lần đầu render

  const SumItems = (items) => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  // Mở popup và hiển thị chi tiết hóa đơn
  const openBillDetail = (bill) => {
    setSelectedBill(bill); // Gán hóa đơn được chọn vào state selectedBill
  };

  // Đóng popup
  const closePopup = () => {
    setSelectedBill(null); // Xóa thông tin hóa đơn khi đóng popup
  };

  // Cập nhật lại danh sách hóa đơn sau khi hoàn thành
  const handleComplete = (billId) => {
    setBills((prevBills) =>
      prevBills.filter((bill) => bill._id !== billId) // Loại bỏ hóa đơn đã cập nhật
    );
  };

  return (
    <div className="waiter-container">
      <NavbarWaiter />
      
      {loading ? (
        <p>Đang tải...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : bills.length === 0 ? (
        <p>Không có hóa đơn nào ở trạng thái hoàn thành.</p>
      ) : (
        <ul className="bill-list">
          {bills.map((bill) => (
            <li key={bill._id} className="bill-item" onClick={() => openBillDetail(bill)}>
              <p><strong>Bàn:</strong> {bill.idTable?.tableName || "Không rõ"}</p>
              <p><strong>Tổng tiền:</strong> {bill.totalPrice} VND</p>
              <p><strong>SL:</strong> {SumItems(bill.billInfo)}</p>
            </li>
          ))}
        </ul>
      )}

      {/* Hiển thị popup chi tiết hóa đơn nếu có */}
      {selectedBill && (
        <PopUpBillComplete bill={selectedBill} onClose={closePopup} onComplete={handleComplete} />
      )}
    </div>
  );
};

export default Waiter;
