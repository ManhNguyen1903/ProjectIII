import React from "react";
import "./PopUpBill.css";

const PopUpBill = ({ isVisible, products, totalAmount, onClose, handlePayment }) => {
  if (!isVisible) return null;

  // Hàm in hóa đơn và đóng cửa sổ pop-up và cửa sổ in
  const handlePrint = () => {
    const printWindow = window.open("", "", "height=auto, width=500");
    printWindow.document.write("<html><head><title>Hóa Đơn</title></head><body>");
    printWindow.document.write("<h2>Hóa đơn</h2>");
    printWindow.document.write("<table border='1' cellpadding='5' cellspacing='0'>");
    printWindow.document.write("<thead><tr><th>Tên sản phẩm</th><th>Số lượng</th><th>Giá</th></tr></thead>");
    printWindow.document.write("<tbody>");
    
    // In các sản phẩm trong hóa đơn
    products.forEach((product) => {
      printWindow.document.write(`
        <tr>
          <td>${product.name}</td>
          <td>${product.quantity}</td>
          <td>${(product.price * product.quantity).toLocaleString("vi-VN")}₫</td>
        </tr>
      `);
    });

    printWindow.document.write("</tbody>");
    printWindow.document.write("</table>");
    printWindow.document.write(`<div><strong>Tổng tiền: ${totalAmount.toLocaleString("vi-VN")}₫</strong></div>`);
    printWindow.document.write("</body></html>");
    printWindow.document.close(); // Đóng cửa sổ tài liệu để có thể in
    printWindow.print(); // Gọi lệnh in

    // Đóng cửa sổ in sau khi in xong
    printWindow.onafterprint = () => {
      printWindow.close(); // Đóng cửa sổ in khi in hoàn tất
    };
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Hóa đơn</h2>
        <table className="bill-table">
          <thead>
            <tr>
              <th>Tên sản phẩm</th>
              <th>Số lượng</th>
              <th>Giá</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>{(product.price * product.quantity).toLocaleString("vi-VN")}₫</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="bill-total">
          Tổng tiền: {totalAmount.toLocaleString("vi-VN")}₫
        </div>
        <div className="popup-actions">
          <button className="close-btn" onClick={onClose}>
            Đóng
          </button>
          <button className="print-btn" 
            onClick={()=>{
              handlePayment();
           }}>
            In
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUpBill;
