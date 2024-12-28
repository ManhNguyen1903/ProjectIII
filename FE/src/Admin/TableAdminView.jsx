import React from "react";
import "./TableAdminView.css";

function TableAdminView({ tables, onTableSelect, selectedFilter, setSelectedFilter }) {
  // Lọc bàn theo trạng thái được chọn
  const filteredTables = tables.filter((table) =>
    selectedFilter === "all"
      ? true
      : selectedFilter === "empty"
      ? table.status === "empty"
      : table.status === "occupied"
  );

  return (
    <div className="view-table">
      {/* Bộ lọc trạng thái bàn */}
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

      {/* Danh sách bàn */}
      <div className="table-list">
        {filteredTables.map((table) => (
          <div
            key={table.id}
            className={`table-item ${table.status === "occupied" ? "occupied" : ""}`}
            onClick={() => onTableSelect(table)}
          >
            {table.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TableAdminView;
