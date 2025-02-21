import React from "react";
import "./PopUpBillComplete.css";

const PopUpBillComplete= ({ bill, onClose, onComplete }) => {
  if (!bill) return null;

  const handleComplete = async () => {
    try {
      // Call API để cập nhật trạng thái hóa đơn
      const response = await fetch(`http://localhost:8017/api/bills/${bill._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "delivered" }),
      });

      if (!response.ok) {
        throw new Error("Cập nhật trạng thái thất bại.");
      }

      // Thông báo thành công qua callback
      if (onComplete) {
        onComplete(bill._id);
      }

      // Đóng popup sau khi hoàn thành
      onClose();
    } catch (error) {
      console.error("Error updating bill:", error);
      alert("Có lỗi xảy ra khi cập nhật trạng thái hóa đơn.");
    }
  };

  return (
    <div className="popup-bill">
      <div className="popup-content">
        <p><strong></strong> {bill.idTable.tableName || "Không rõ"}</p>
        <div>
          <strong>Danh sách:</strong>
          {bill.billInfo.length > 0 ? (
            <ul>
              {bill.billInfo.map((item) => (
                <li key={item._id}>
                  {item.productId.name} - SL: {item.quantity}
                  {item.note && (
                    <div><strong>Ghi chú:</strong> {item.note}</div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p>Không có món ăn nào trong hóa đơn này.</p>
          )}
        </div>
        <button className="close" onClick={onClose}>Đóng</button>
        <button className="DaGiao" onClick={handleComplete}>Đã giao</button>
      </div>
    </div>
  );
};

export default PopUpBillComplete;
