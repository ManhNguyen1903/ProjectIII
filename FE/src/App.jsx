import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login/Login";
import Admin from "./Admin/Admin";
import SignUp from "./SignUp/SignUp";
import Employee from "./Employee/Employee";
import Chef from "./Chef/Chef";
import Waiter from "./Waiter/Waiter";

function App() {
  // Kiểm tra trạng thái đăng nhập từ localStorage
  const isAuthenticated = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        
        {/* Kiểm tra nếu chưa đăng nhập sẽ chuyển hướng về Login */}
        <Route 
          path="/admin" 
          element={isAuthenticated ? <Admin /> : <Navigate to="/" />} 
        />
        <Route 
          path="/employee" 
          element={isAuthenticated ? <Employee /> : <Navigate to="/" />} 
        />
        <Route 
          path="/chef" 
          element={isAuthenticated ? <Chef /> : <Navigate to="/" />} 
        />
        <Route 
          path="/waiter" 
          element={isAuthenticated ? <Waiter /> : <Navigate to="/" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
