import React, { useState } from "react";
import "./Chef.css";
import { tableData } from "../Data";
import NavbarChef from "./NavBarChef";
import PopUpBillPick from "./PopUpBillPick";

function Chef() {
  const [tables, setTables] = useState(tableData);
  const [transferredTables, setTransferredTables] = useState([]);

  const [selectedTable, setSelectedTable] = useState(null); // Lưu bàn được chọn
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Quản lý trạng thái Popup

  const handleTransfer = (tableId) => {
    const tableToTransfer = tables.find((table) => table.id === tableId);
    if (tableToTransfer) {
      setTables((prevTables) => prevTables.filter((table) => table.id !== tableId));
      setTransferredTables((prevTables) => [...prevTables, tableToTransfer]);
    }
  };
  const SumItems = (items) => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };
  
  const handleOpenPopup = (id) => {
    const table = transferredTables.find((table) => table.id === id);
    setSelectedTable(table); // Lưu thông tin bàn
    setIsPopupOpen(true); // Hiển thị Popup
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false); // Đóng Popup
    setSelectedTable(null);
  };

  return (
    <div className="chef">
      <NavbarChef />
      <div className="Name"> 
        <div className="Name-order">
          Order
        </div>
        <div className="Name-pick">
          Pick
        </div>
      </div>
      <div className="chef-content">
        <div className="chef-table">
          <table>
            <thead>
              <tr>
                <th>Tên bàn</th>
                <th>Số lượng món</th>
              </tr>
            </thead>
            <tbody>
              {tables.map((table) => (
                <tr key={table.id}>
                  <td>
                    <button className="transfer-btn" onClick={() => handleTransfer(table.id)}>
                      {table.name}
                    </button>
                  </td>
                  <td>{SumItems(table.items)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="chef-arrow">➔</div>

        <div className="chef-table">
          <table>
            <thead>
              <tr>
                <th>Tên bàn</th>
                <th>Số lượng món</th>
              </tr>
            </thead>
            <tbody>
              {transferredTables.map((table) => (
                <tr key={table.id}>
                  <td>
                    <button className="transfer-btn" onClick={() => handleOpenPopup(table.id)}>
                      {table.name}
                    </button>
                  </td>
                  <td>{SumItems(table.items)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Hiển thị Popup */}
      {isPopupOpen && <PopUpBillPick table={selectedTable} onClose={handleClosePopup} />}
    </div>
  );
}

export default Chef;
