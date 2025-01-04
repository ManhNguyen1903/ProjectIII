import React, { useState , useEffect } from "react";
import Navbar from "./Navbar";
import TableView from "./TableView";
import MenuView from "./MenuView";
import TransactionView from "./TransactionView";
import { productsData } from "../Data";
import "./Employee.css";
import axios from "axios";

function Employee() {
  const [currentView, setCurrentView] = useState("phongban");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedTableId, setSelectedTableId] = useState(null);
  const [products, setProducts] = useState(productsData);
  const [showBillPopup, setShowBillPopup] = useState(false);
  const [tableList, setTableList] = useState([]); // Đảm bảo bạn quản lý danh sách bàn ở đây


  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get("http://localhost:8017/api/tables"); // Thay thế bằng endpoint thực tế
        setTableList(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách bàn:", error);
      }
    };
    fetchTables();
  }, []);

  const handleAddProduct = (product) => {
    if (!selectedTableId) {
      alert("Vui lòng chọn bàn trước khi thêm món!");
      return;
    }
     // Lấy thông tin bàn dựa vào selectedTableId
    const selectedTable = tableList.find((table) => table._id === selectedTableId);

    const confirmed = window.confirm(
      `Bạn có chắc chắn muốn thêm món "${product.name}" vào bàn ${selectedTable.tableName}?`
    );
  
    if (confirmed) {
      setProducts((prevProducts) => {
        const existingProduct = prevProducts.find(
          (p) => p.id === product.id && p.tableId === selectedTableId
        );
  
        if (existingProduct) {
          // Tăng số lượng nếu sản phẩm đã tồn tại
          return prevProducts.map((p) =>
            p.id === product.id && p.tableId === selectedTableId
              ? { ...p, quantity: p.quantity + 1 }
              : p
          );
        } else {
          // Thêm sản phẩm mới vào danh sách
          return [
            ...prevProducts,
            { ...product, tableId: selectedTableId, quantity: 1 },
          ];
        }
      });
    }
  };
  
  // Cập nhật trạng thái của bàn khi thanh toán
  const handlePayment = () => {
    // Đóng pop-up hóa đơn
    setShowBillPopup(false);
    
    // Deselect table
    setSelectedTableId(null);
    
    // Cập nhật trạng thái bàn về 'empty' và xóa dữ liệu sản phẩm của bàn đó
    setTableList((prevTables) =>
      prevTables.map((table) =>
        table._id === selectedTableId
          ? { ...table, status: "empty" } // Chuyển trạng thái bàn về "empty"
          : table
      )
    );
    
    // Xóa các sản phẩm của bàn đã thanh toán
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.tableId !== selectedTableId)
    );
  };


  // Tăng số lượng sản phẩm
  const increaseQuantity = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  // Giảm số lượng sản phẩm
  const decreaseQuantity = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (product.id === id && product.quantity > 0) {
          const updatedProduct = { ...product, quantity: product.quantity - 1 };
  
          // Nếu số lượng giảm về 0, xóa sản phẩm khỏi danh sách
          if (updatedProduct.quantity === 0) {
            return null; // Trả về null, để loại bỏ sản phẩm này
          }
  
          return updatedProduct;
        }
        return product;
      }).filter((product) => product !== null) // Loại bỏ các sản phẩm null
    );
  };
  

  // Tính tổng số tiền cho bàn hiện tại
  const tableProducts = products.filter(
    (product) => product.tableId === selectedTableId
  );
  const totalAmount = tableProducts.reduce(
    (total, product) => total + product.quantity * product.price,
    0
  );

  return (
    <div className="employee">
      {/* Thanh điều hướng */}
      <Navbar currentView={currentView} setCurrentView={setCurrentView} />

      {/* Nội dung chính */}
      <div className="content">
        <div className="content-left">
          {currentView === "phongban" && (
            <TableView
              tables={tableList} // Truyền danh sách bàn đã được cập nhật
              onTableSelect={setSelectedTableId} // Truyền hàm chọn bàn
              setTables={setTableList} // Cập nhật lại trạng thái của bàn
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
            />
          )}

          {currentView === "thucdon" && <MenuView onAddProduct={handleAddProduct} />}
        </div>

        <div className="content-right">
          <TransactionView
            selectedTableId={selectedTableId}
            tableData={tableList} // Truyền bảng đã được cập nhật
            products={tableProducts}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            totalAmount={totalAmount}
            showBillPopup={showBillPopup}
            setShowBillPopup={setShowBillPopup}
            handlePayment={handlePayment} // Truyền hàm thanh toán
          />
        </div>
      </div>
    </div>
  );
}

export default Employee;
