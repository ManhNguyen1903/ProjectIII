import React, { useState, useEffect } from "react";
import axios from "axios";
import NavbarChef from "./NavBarChef";
import PopUpBillPick from "./PopUpBillPick";
import "./Chef.css";

function Chef() {
  const [pendingBills, setPendingBills] = useState([]);
  const [processingBills, setProcessingBills] = useState([]);
  const [completedBills, setCompletedBills] = useState([]);  // Danh sách hóa đơn hoàn thành
  const [selectedBill, setSelectedBill] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Fetch dữ liệu ban đầu từ API
  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await axios.get("http://localhost:8017/api/bills");
        const bills = response.data;
        setPendingBills(bills.filter((bill) => bill.status === "pending"));
        setProcessingBills(bills.filter((bill) => bill.status === "processing"));
        setCompletedBills(bills.filter((bill) => bill.status === "complete")); // Lọc hóa đơn hoàn thành
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu hóa đơn:", error);
      }
    };

    fetchBills();
  }, []);

  const SumItems = (items) => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const handleTransferToProcessing = async (billId) => {
    try {
      // Chuyển trạng thái hóa đơn sang "processing"
      await axios.put(`http://localhost:8017/api/bills/${billId}`, { status: "processing" });

      // Fetch lại danh sách bill sau khi cập nhật
      const response = await axios.get("http://localhost:8017/api/bills");
      const bills = response.data;

      // Cập nhật danh sách bill trên giao diện
      setPendingBills(bills.filter((bill) => bill.status === "pending"));
      setProcessingBills(bills.filter((bill) => bill.status === "processing"));
      setCompletedBills(bills.filter((bill) => bill.status === "complete"));
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái hóa đơn:", error);
    }
  };

  const handleOpenPopup = (billId) => {
    const bill = processingBills.find((bill) => bill._id === billId);
    setSelectedBill(bill);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedBill(null);
  };

  const handleComplete = async (billId) => {
    try {
      // Cập nhật trạng thái của hóa đơn thành "complete"
      await axios.put(`http://localhost:8017/api/bills/${billId}`, { status: "complete" });

      // Fetch lại dữ liệu sau khi cập nhật
      const response = await axios.get("http://localhost:8017/api/bills");
      const bills = response.data;

      // Cập nhật lại danh sách hóa đơn
      setProcessingBills(bills.filter((bill) => bill.status === "processing"));
      setCompletedBills(bills.filter((bill) => bill.status === "complete"));
      alert("Hóa đơn đã được hoàn thành!");
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái hóa đơn:", error);
      alert("Có lỗi khi cập nhật trạng thái hóa đơn.");
    }
  };

  return (
    <div className="chef-page">
      <NavbarChef />

      <div className="board-container">
        <div className="board order">
          <h2>Order</h2>
          {pendingBills.map((bill) => (
            <div key={bill._id} className="board-item">
              <div className="board-item-name" onClick={() => handleTransferToProcessing(bill._id)}>
                {bill.idTable?.tableName || "Không rõ"}
              </div>
              <div className="board-item-quantity">{SumItems(bill.billInfo)}</div>
            </div>
          ))}
        </div>

        <div className="board pick">
          <h2>Pick</h2>
          {processingBills.map((bill) => (
            <div key={bill._id} className="board-item">
              <div className="board-item-name" onClick={() => handleOpenPopup(bill._id)}>
                {bill.idTable?.tableName || "Không rõ"}
              </div>
              <div className="board-item-quantity">{SumItems(bill.billInfo)}</div>
            </div>
          ))}
        </div>
      </div>

      {isPopupOpen && (
        <PopUpBillPick 
          bill={selectedBill} 
          onClose={handleClosePopup} 
          onComplete={handleComplete} 
        />
      )}
    </div>
  );
}

export default Chef;
