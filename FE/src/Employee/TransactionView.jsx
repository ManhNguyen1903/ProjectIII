import React from "react";
import "./TransactionView.css";

function TransactionView({ selectedTableId, currentBill, handlePayment }) {
  const products =
    currentBill?.billInfo.map((item) => ({
      id: item.productId._id,
      name: item.productId.name,
      price: item.productId.price,
      quantity: item.quantity,
      note: item.note || "", // Lấy ghi chú nếu có
    })) || [];

  const totalAmount = products.reduce(
    (total, product) => total + product.quantity * product.price,
    0
  );

  return (
    <div className="transaction">
      <div className="Bill">
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Tên sản phẩm</th>
              <th>Số lượng</th>
              <th>Bảng giá</th>
              <th>Ghi chú</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price.toLocaleString("vi-VN")}₫</td>
                <td>{item.note}</td> {/* Hiển thị ghi chú */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="transaction-summary">
        <div className="notes">
          <div>{currentBill ? currentBill.idTable.tableName : "Chưa chọn bàn"}</div>
        </div>
        <div className="total">
          Tổng tiền: {totalAmount.toLocaleString("vi-VN")}₫
        </div>
      </div>

      <button
        className="checkout-btn"
        onClick={handlePayment}
        disabled={!currentBill} // Chỉ bật nút khi có hóa đơn
      >
        Thanh toán
      </button>
    </div>
  );
}

export default TransactionView;
