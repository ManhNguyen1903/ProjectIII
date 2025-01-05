import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TransactionHistory.css';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Format currency to VND
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Calculate duration between check-in and check-out
  const calculateDuration = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return 'N/A';
    
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = Math.abs(end - start);
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours === 0) {
      return `${minutes} phút`;
    }
    return `${hours} giờ ${minutes} phút`;
  };

  // Format bill items
  const formatBillItems = (billInfo) => {
    if (!billInfo || billInfo.length === 0) return 'Không có món';
    
    return billInfo.map(item => {
      const productName = item.productId?.name || 'Không xác định';
      return `${productName} x${item.quantity}`;
    }).join(', ');
  };

  // Fetch transactions from API
  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:8017/api/bills');
      const paidTransactions = response.data.filter(
        transaction => transaction.status === 'paid'
      );
      setTransactions(paidTransactions);
      setFilteredTransactions(paidTransactions);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu giao dịch:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // Handle date range filter
  const handleFilter = () => {
    if (!startDate || !endDate) {
      alert('Vui lòng chọn cả ngày bắt đầu và ngày kết thúc');
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999); // Set end date to end of day

    const filtered = transactions.filter(transaction => {
      const transactionDate = new Date(transaction.dateCheckIn);
      return transactionDate >= start && transactionDate <= end;
    });

    setFilteredTransactions(filtered);
  };

  // Calculate total amount
  const calculateTotal = () => {
    return filteredTransactions.reduce((sum, t) => sum + (t.totalPrice || 0), 0);
  };

  return (
    <div className="transaction-history">
      <div className="filter-section">
        <div className="filter-group">
          <label htmlFor="startDate">Từ ngày:</label>
          <input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        
        <button className='Truyvan' onClick={handleFilter}>Truy vấn</button>

        <div className="filter-group">
          <label htmlFor="endDate">Đến ngày:</label>
          <input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <tr className="total-row">
            <label>Tổng cộng:</label>
            <td className="amount">{formatCurrency(calculateTotal())}</td>
            <td colSpan="3"></td>
        </tr>
      </div>
        <div className='History'>
            <table className="transaction-table">
            <thead>
            <tr>
                <th>Tên bàn</th>
                <th>Danh sách món</th>
                <th className="amount">Tổng tiền</th>
                <th>Thời gian vào</th>
                <th>Thời gian ra</th>
                <th>Thời gian sử dụng</th>
            </tr>
            </thead>
            <tbody>
            {filteredTransactions.map((transaction) => (
                <tr key={transaction._id}>
                <td>{transaction.idTable?.tableName || 'Không xác định'}</td>
                <td>{formatBillItems(transaction.billInfo)}</td>
                <td className="amount">
                    {formatCurrency(transaction.totalPrice || 0)}
                </td>
                <td>{formatDate(transaction.dateCheckIn)}</td>
                <td>
                    {transaction.dateCheckOut ? 
                    formatDate(transaction.dateCheckOut) : 
                    'Chưa thanh toán'}
                </td>
                <td>
                    {calculateDuration(transaction.dateCheckIn, transaction.dateCheckOut)}
                </td>
                </tr>
            ))}

            </tbody>
        </table>
        
        {filteredTransactions.length === 0 && (
            <p className="no-data">Không có giao dịch nào trong khoảng thời gian này.</p>
        )}
        </div>
    </div>
  );
};

export default TransactionHistory;