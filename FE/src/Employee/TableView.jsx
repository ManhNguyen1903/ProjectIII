import React from "react";
import "./TableView.css";

function TableView({ tables, onTableSelect, setTables, selectedFilter, setSelectedFilter }) {
  // Lọc bàn theo trạng thái được chọn
  const filteredTables = tables.filter((table) =>
    selectedFilter === "all"
      ? true
      : selectedFilter === "empty"
      ? table.status === "empty"
      : table.status === "occupied"
  );

  // Xử lý khi chọn bàn
  const handleTableClick = (id) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === id ? { ...table, status: "occupied" } : table
      )
    );
  };

  return (
    <div className="view-table">
      {/* Filter Options */}
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

      {/* Table List */}
      <div className="table-list">
        {filteredTables.map((table) => (
          <div
            key={table.id}
            className={`table-item ${table.status === "occupied" ? "occupied" : ""}`}
            onClick={() => {
              onTableSelect(table.id); // Gọi hàm khi chọn bàn
              handleTableClick(table.id); // Cập nhật trạng thái của bàn
            }}
          >
            {table.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TableView;
