import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import TableView from "./TableView";
import MenuView from "./MenuView";
import TransactionView from "./TransactionView";
import "./Employee.css";
import axios from "axios";

function Employee() {
  const [currentView, setCurrentView] = useState("phongban");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedTableId, setSelectedTableId] = useState(null);
  const [tableList, setTableList] = useState([]);
  const [currentBill, setCurrentBill] = useState(null);

  
  const selectedTable = tableList.find((table) => table._id === selectedTableId);
  // Fetch danh sách bàn từ API
  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get("http://localhost:8017/api/tables");
        setTableList(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách bàn:", error);
      }
    };
    fetchTables();
  }, []);

  // Fetch bill details when a table is selected
  useEffect(() => {
    if (selectedTableId) {
      const fetchBill = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8017/api/bills/table/${selectedTableId}`
          );
          setCurrentBill(response.data);
        } catch (error) {
          console.error("Lỗi khi lấy thông tin hóa đơn:", error);
        }
      };
      fetchBill();
    }
  }, [selectedTableId]);

  // Thêm sản phẩm vào hóa đơn
  const handleAddProduct = async (product) => {
    if (!selectedTableId) {
      alert("Vui lòng chọn bàn trước khi thêm món!");
      return;
    }

    try {
      // Lấy hóa đơn đang mở theo bàn
      const response = await axios.get(`http://localhost:8017/api/bills/table/${selectedTableId}`);
      const bill = response.data;

      if (bill) {
        const confirmAddProduct = window.confirm(
          `Bạn có chắc chắn muốn thêm món "${product.name}" vào hóa đơn ${selectedTable.tableName}?`
        );
        if (confirmAddProduct) {
          // Thêm sản phẩm vào hóa đơn đang mở
          await axios.patch(`http://localhost:8017/api/bills/${bill._id}`, {
            productId: product._id, // Chỉ truyền productId
          });

          // Cập nhật hóa đơn trong giao diện
          setCurrentBill((prevBill) => ({
            ...prevBill,
            billInfo: [
              ...prevBill.billInfo,
              { productId: product, quantity: 1, note: "" }, // Tạm thời thêm mới cho UI
            ],
          }));
        }
      } else {
        // Tạo hóa đơn mới nếu chưa có
        const newBill = await axios.post("http://localhost:8017/api/bills", {
          idTable: selectedTableId,
          billInfo: [{ productId: product._id, quantity: 1, note: "" }],
        });

        setCurrentBill(newBill.data);

        // Cập nhật danh sách bàn (đổi trạng thái bàn)
        setTableList((prev) =>
          prev.map((table) =>
            table._id === selectedTableId ? { ...table, status: "occupied" } : table
          )
        );

        //alert(`Đã tạo hóa đơn mới cho bàn và thêm món "${product.name}"`);
      }
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm vào hóa đơn:", error);
    }
  };

  // Xử lý thanh toán
  const handlePayment = async () => {
    if (!selectedTableId) {
      alert("Vui lòng chọn bàn để thanh toán.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8017/api/bills/table/${selectedTableId}`
      );
      const bill = response.data;

      if (bill) {
        const confirmPayment = window.confirm(
          `Bạn có chắc chắn muốn thanh toán hóa đơn ${selectedTable.tableName}?`
        );
        if(confirmPayment){
          // Cập nhật trạng thái hóa đơn thành "paid"
          await axios.put(`http://localhost:8017/api/bills/${bill._id}`, {
            status: "paid",
            dateCheckOut: new Date() // Cập nhật thời gian checkout
          });

          // Cập nhật trạng thái bàn về "empty" sau khi thanh toán
          await axios.put(`http://localhost:8017/api/tables/${selectedTableId}`, {
            status: "empty",
            currentBill: null,  // Xóa hóa đơn hiện tại của bàn
          });

          alert("Thanh toán thành công!");

          // Cập nhật danh sách bàn
          setTableList((prevTables) =>
            prevTables.map((table) =>
              table._id === selectedTableId ? { ...table, status: "empty" } : table
            )
          );

          // Reset thông tin hóa đơn
          setCurrentBill(null);
          setSelectedTableId(null);
        }
      }
    } catch (error) {
      console.error("Lỗi khi thanh toán:", error);
      alert("Có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  return (
    <div className="employee">
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />

      <div className="content">
        <div className="content-left">
          {currentView === "phongban" && (
            <TableView
              tables={tableList}
              onTableSelect={setSelectedTableId}
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
              setTables={setTableList} // Chuyển hàm setTables xuống để cập nhật
            />
          )}
          {currentView === "thucdon" && (
            <MenuView onAddProduct={handleAddProduct} />
          )}
        </div>

        <div className="content-right">
          <TransactionView
            selectedTableId={selectedTableId}
            currentBill={currentBill}
            handlePayment={handlePayment}
          />
        </div>
      </div>
    </div>
  );
}

export default Employee;
