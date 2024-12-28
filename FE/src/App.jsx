import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import Admin from "./Admin/Admin";
import SignUp from "./SignUp/SignUp";
import Employee from "./Employee/Employee";
import Chef from "./Chef/Chef";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/chef" element={<Chef />} />
      </Routes>
    </Router>
  );
}

export default App;
