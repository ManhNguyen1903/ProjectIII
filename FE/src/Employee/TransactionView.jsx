import React from "react";
import PopUpBill from "./PopUpBill";
import "./TransactionView.css";

function TransactionView({
  selectedTableId,
  tableData,
  products,
  increaseQuantity,
  decreaseQuantity,
  totalAmount,
  showBillPopup,
  setShowBillPopup,
  handlePayment, // Thêm hàm handlePayment
}) {
  // Lấy thông tin bàn hiện tại
  const table = tableData.find((t) => t.id === selectedTableId);

  return (
    <div className="transaction">
      <div className="Bill">
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Tên sản phẩm</th>
              <th>Số lượng</th>
              <th>Bảng giá</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  {product.name}
                  <div className="note">
                    <textarea placeholder="Ghi chú"></textarea>
                  </div>
                </td>
                <td className="quantity-cell">
                  <button
                    className="quantity-btn"
                    onClick={() => decreaseQuantity(product.id)}
                  >
                    -
                  </button>
                  <span>{product.quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() => increaseQuantity(product.id)}
                  >
                    +
                  </button>
                </td>
                <td>{product.price.toLocaleString("vi-VN")}₫</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="transaction-summary">
        <div className="notes">
          <div>{table ? table.name : "Chưa chọn bàn"}</div>
        </div>
        <div className="total">
          Tổng tiền: {totalAmount.toLocaleString("vi-VN")}₫
        </div>
      </div>
      <button
        className="checkout-btn"
        onClick={() => {
          setShowBillPopup(true); // Hiển thị pop-up hóa đơn
        }}
      >
        Thanh toán
      </button>

      <PopUpBill
        isVisible={showBillPopup}
        products={products}
        totalAmount={totalAmount}
        onClose={() => setShowBillPopup(false)}
        handlePayment={handlePayment}
      />
    </div>
  );
}

export default TransactionView;
