import React from "react";
import "./TableView.css";
import axios from "axios";

function TableView({ tables, onTableSelect, selectedFilter, setSelectedFilter }) {
  const filteredTables = tables.filter((table) =>
    selectedFilter === "all"
      ? true
      : selectedFilter === "empty"
      ? table.status === "empty"
      : table.status === "occupied"
  );

// When table is empty and user selects it to create a new bill
const handleTableClick = async (id) => {
  try {
    const table = tables.find((table) => table._id === id);

    if (!table) {
      throw new Error("Không tìm thấy bàn");
    }

    // If the table is empty, create a new bill for it
    if (table.status === "empty") {
      const newBill = await axios.post("http://localhost:8017/api/bills", {
        idTable: id, // Send table ID only, no products
        billInfo: []  // Bill starts with no products
      });

      // Update table status to occupied
      await axios.put(`http://localhost:8017/api/tables/${id}`, {
        status: "occupied",
      });

      alert(`Đã tạo hóa đơn mới cho bàn ${table.tableName}`);
    }
    // If the table is occupied, fetch the current bill
    else if (table.status === "occupied") {
      const billResponse = await axios.get(`http://localhost:8017/api/bills/table/${id}`);
      const currentBill = billResponse.data;
      console.log(currentBill);  // Handle the current bill
    }

    onTableSelect(id);

  } catch (error) {
    alert("Có lỗi xảy ra khi xử lý chọn bàn");
    console.error("Lỗi:", error);
  }
};

  
  return (
    <div className="view-table">
      <div className="table-note">
        <div
          className={`note-table ${selectedFilter === "all" ? "active" : ""}`}
          onClick={() => setSelectedFilter("all")}
        >
          Tất cả
        </div>
        <div
          className={`note-table ${selectedFilter === "empty" ? "active" : ""}`}
          onClick={() => setSelectedFilter("empty")}
        >
          Trống
        </div>
        <div
          className={`note-table ${selectedFilter === "occupied" ? "active" : ""}`}
          onClick={() => setSelectedFilter("occupied")}
        >
          Có khách
        </div>
      </div>

      <div className="table-list">
        {filteredTables.map((table) => (
          <div
            key={table._id}
            className={`table-item ${table.status === "occupied" ? "occupied" : ""}`}
            onClick={() => handleTableClick(table._id)}
          >
            {table.tableName}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TableView;
