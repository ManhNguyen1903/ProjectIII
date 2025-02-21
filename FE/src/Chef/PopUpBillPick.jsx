import React from "react";
import "./PopUpBillPick.css";

const PopUpBillPick = ({ bill, onClose, onComplete }) => {
  if (!bill) return null;

  const handleComplete = async () => {
    try {
      // Call API to update the bill status
      const response = await fetch(`http://localhost:8017/api/bills/${bill._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "complete" }),
      });

      if (!response.ok) {
        throw new Error("Cập nhật trạng thái thất bại.");
      }

      // Notify success via callback
      if (onComplete) {
        onComplete(bill._id);
      }

      // Close the popup after completion
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
        <button className="DaGiao" onClick={handleComplete}>Hoàn thành</button>
      </div>
    </div>
  );
};

export default PopUpBillPick;
