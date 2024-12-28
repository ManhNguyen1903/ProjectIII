import React from "react";
import "./PopUpBillPick.css";

function PopUpBillPick({ table, onClose }) {
  if (!table) return null;
  const SumItems = (items) => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };
  return (
    <div className="popup">
      <div className="popup-content">
        <div className="popup-header">
          <span>
            <strong>Order #{table.id}</strong>
          </span>
          <span>{SumItems(table.items)} items</span>
        </div>
        <div className="popup-body">
          <p><strong>Table Name:</strong> {table.name}</p>
          <p><strong>Name:</strong> {table.customerName}</p>
          <p><strong>Phone:</strong> {table.phone}</p>
          <p><strong>Bartender:</strong> {table.bartender}</p>
        </div>
        <div className="popup-items">
          <table>
            <thead>
              <tr>
                <th>Items</th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody>
              {table.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.quantity} x {item.name}</td>
                  <td>{item.note || "Không có"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="row-end">
        <button className="close-btn" onClick={onClose}>Đóng</button>
        <button className="complete-btn"onClick={onClose}>Hoàn thành</button>
        </div>
      </div>
    </div>
  );
}

export default PopUpBillPick;
