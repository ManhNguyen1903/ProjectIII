// TableView Component
import React from "react";
import "./TableView.css";
import axios from "axios";

function TableView({ tables, onTableSelect, selectedFilter, setSelectedFilter, setTables }) {
  const filteredTables = tables.filter((table) =>
    selectedFilter === "all"
      ? true
      : selectedFilter === "empty"
      ? table.status === "empty"
      : table.status === "occupied"
  );

  const handleTableClick = async (id) => {
    try {
      const table = tables.find((table) => table._id === id);

      if (!table) {
        throw new Error("Không tìm thấy bàn");
      }

      // Nếu bàn trống, tạo hóa đơn mới
      if (table.status === "empty") {
        const confirmCreateBill = window.confirm(
          `Bạn có chắc chắn muốn tạo hóa đơn mới cho bàn ${table.tableName}?`
        );
        if (confirmCreateBill) {
          // Tạo hóa đơn mới
          await axios.post("http://localhost:8017/api/bills", {
            idTable: id,
            billInfo: []
          });

          // Cập nhật trạng thái bàn thành "occupied"
          await axios.put(`http://localhost:8017/api/tables/${id}`, {
            status: "occupied",
          });

          // Cập nhật lại danh sách bàn
          setTables(prevTables =>
            prevTables.map((table) =>
              table._id === id ? { ...table, status: "occupied" } : table
            )
          );

          // alert(`Đã tạo hóa đơn mới cho bàn ${table.tableName}`);
        }
      }
      // Nếu bàn đã có khách, lấy hóa đơn hiện tại
      else if (table.status === "occupied") {
        const billResponse = await axios.get(`http://localhost:8017/api/bills/table/${id}`);
        const currentBill = billResponse.data;
        console.log(currentBill);
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
            className={`table-item ${table.status}`}
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
