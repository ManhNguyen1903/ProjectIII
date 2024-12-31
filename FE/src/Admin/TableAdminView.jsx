import React, { useState, useEffect } from "react";
import "./TableAdminView.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import AddTablePopup from "./AddTablePopup"; 
import EditTablePopup from "./EditTablePopup"; 

const TableAdminView = () => {
  const [tables, setTables] = useState([]); // Danh sách bàn
  const [selectedTable, setSelectedTable] = useState(null); // Bàn được chọn để sửa
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Điều khiển việc mở modal thêm bàn
  const [selectedFilter, setSelectedFilter] = useState("all"); // Điều khiển bộ lọc trạng thái bàn (tất cả, trống, có khách)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Modal sửa bàn
  
  const apiUrl = "http://localhost:8017/api/tables";

  // Lấy danh sách bàn từ API
  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get(apiUrl);
        setTables(response.data); // Cập nhật danh sách bàn
      } catch (error) {
        console.error("Error fetching tables", error);
      }
    };

    fetchTables();
  }, []); // Thực hiện khi component mount

  // Lọc danh sách bàn theo trạng thái
  const filteredTables = tables.filter((table) =>
    selectedFilter === "all"
      ? true
      : selectedFilter === "empty"
      ? table.status === "empty"
      : table.status === "occupied"
  );

  // Thêm bàn mới
  const handleAddTable = async (newTable) => {
    try {
      const response = await axios.post(apiUrl, newTable);
      setTables((prev) => [...prev, response.data]); // Cập nhật danh sách bàn
      setIsAddModalOpen(false); // Đóng modal sau khi thêm bàn
    } catch (error) {
      console.error("Error adding table", error);
    }
  };

  // Mở modal chỉnh sửa bàn
  const handleEditTableClick = (table) => {
    setSelectedTable(table); // Chọn bàn để sửa
    setIsAddModalOpen(false); // Đảm bảo modal thêm bàn không bị mở cùng lúc
    setIsEditModalOpen(true); // Mở modal chỉnh sửa
  };

  // Chỉnh sửa bàn
  const handleUpdateTable = async (updatedTable) => {
    try {
      const response = await axios.put(
        `${apiUrl}/${updatedTable._id}`,
        updatedTable
      );
      setTables((prev) =>
        prev.map((table) => (table._id === updatedTable._id ? response.data : table))
      );
      setIsEditModalOpen(false); // Đóng modal sau khi sửa
    } catch (error) {
      console.error("Error updating table:", error);
    }
  };

  // Xóa bàn
  const handleDeleteTable = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      setTables((prevTables) => prevTables.filter((table) => table._id !== id));
      setSelectedTable(null); // Đóng modal sau khi xóa
      setIsEditModalOpen(false); // Đóng modal sau khi xóa
    } catch (error) {
      console.error("Error deleting table", error);
    }
  };

  return (
    <div className="table-admin-view">
      <div className="navbar-table">
        <h2>Quản lý bàn</h2>
        <button className="add-table-icon" onClick={() => setIsAddModalOpen(true)}>
          <FontAwesomeIcon icon={faPlus} size="2x" />
        </button>
      </div>

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
        {filteredTables.length === 0 ? (
          <p>Không có bàn nào trong danh sách.</p>
        ) : (
          filteredTables.map((table) => (
            <div
              key={table._id}
              className={`table-item ${table.status === "occupied" ? "occupied" : ""}`}
              onClick={() => handleEditTableClick(table)}
            >
              {table.tableName}
            </div>
          ))
        )}
      </div>

      {/* Modal thêm bàn */}
      {isAddModalOpen && (
        <AddTablePopup 
          onClose={() => setIsAddModalOpen(false)} 
          onAdd={handleAddTable} 
        />
      )}

      {/* Modal sửa bàn */}
      {isEditModalOpen && selectedTable && (
        <EditTablePopup
          table={selectedTable}
          onClose={() => setIsEditModalOpen(false)}
          onEdit={handleUpdateTable}
          onDelete={handleDeleteTable}
        />
      )}
    </div>
  );
};

export default TableAdminView;
