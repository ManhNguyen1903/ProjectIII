import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import "./RevenueChart.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Đăng ký các thành phần cho Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RevenueChart = () => {
  const [bills, setBills] = useState([]);
  const [viewType, setViewType] = useState("daily"); // 'daily', 'monthly', 'yearly'

  // Lấy dữ liệu hóa đơn từ API
  const fetchBills = async () => {
    try {
      const response = await axios.get("http://localhost:8017/api/bills");
      const paidBills = response.data.filter((bill) => bill.status === "paid");
      setBills(paidBills);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu hóa đơn:", error);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  // Tạo danh sách đầy đủ các ngày, tháng hoặc năm dựa trên viewType
  const generateLabels = (viewType, bills) => {
    const today = new Date();
    let labels = [];

    if (viewType === "daily") {
      const start = new Date(today.getFullYear(), today.getMonth(), 1);
      const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);

      for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
        labels.push(`${d.getDate()}/${d.getMonth() + 1}`);
      }
    } else if (viewType === "monthly") {
      for (let m = 1; m <= 12; m++) {
        labels.push(`${m}/${today.getFullYear()}`);
      }
    } else if (viewType === "yearly") {
      const years = [...new Set(bills.map((bill) => new Date(bill.dateCheckOut).getFullYear()))];
      const minYear = Math.min(...years);
      const maxYear = Math.max(...years);

      for (let y = minYear; y <= maxYear; y++) {
        labels.push(`${y}`);
      }
    }

    return labels;
  };

  // Hàm xử lý dữ liệu doanh thu
  const processChartData = () => {
    const labels = generateLabels(viewType, bills);

    const groupedData = labels.reduce((acc, label) => {
      acc[label] = 0;
      return acc;
    }, {});

    const processDate = (date) => {
      const d = new Date(date);
      return {
        day: `${d.getDate()}/${d.getMonth() + 1}`,
        month: `${d.getMonth() + 1}/${d.getFullYear()}`,
        year: `${d.getFullYear()}`,
      };
    };

    bills.forEach((bill) => {
      const { day, month, year } = processDate(bill.dateCheckOut);

      if (viewType === "daily" && groupedData[day] !== undefined) {
        groupedData[day] += bill.totalPrice;
      } else if (viewType === "monthly" && groupedData[month] !== undefined) {
        groupedData[month] += bill.totalPrice;
      } else if (viewType === "yearly" && groupedData[year] !== undefined) {
        groupedData[year] += bill.totalPrice;
      }
    });

    return { labels: Object.keys(groupedData), dataset: Object.values(groupedData) };
  };

  const chartData = processChartData();

  return (
    <div>
      <div className="chart-filters">
        <button
          className={viewType === "daily" ? "active" : ""}
          onClick={() => setViewType("daily")}
        >
          Theo ngày
        </button>
        <button
          className={viewType === "monthly" ? "active" : ""}
          onClick={() => setViewType("monthly")}
        >
          Theo tháng
        </button>
        <button
          className={viewType === "yearly" ? "active" : ""}
          onClick={() => setViewType("yearly")}
        >
          Theo năm
        </button>
      </div>

      <Bar
        data={{
          labels: chartData.labels,
          datasets: [
            {
              label: "Doanh thu (VNĐ)",
              data: chartData.dataset,
              backgroundColor: "rgba(18, 207, 43, 0.5)",
              borderColor: "rgb(1, 24, 9)",
              borderWidth: 1,
            },
          ],
        }}
        options={{
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: `Doanh thu ${
                  viewType === "daily"
                    ? "theo ngày"
                    : viewType === "monthly"
                    ? "theo tháng"
                    : "theo năm"
                }`,
                font: {
                  size: 20, // Kích thước phông chữ
                  family: 'Arial, sans-serif', // Kiểu chữ
                  weight: 'bold', // Đậm hoặc bình thường
                },
                color: '#333', // Màu chữ
              },
            },
          }}
          
      />
    </div>
  );
};

export default RevenueChart;
