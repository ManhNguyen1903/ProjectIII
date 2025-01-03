import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

function SignUp() {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [roles, setRoles] = useState([]); // Lưu danh sách roles
  const [message, setMessage] = useState(""); // Thông báo trạng thái
  const navigate = useNavigate();

  // Fetch danh sách roles từ API
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch("http://localhost:8017/api/auth/roles");
        const result = await response.json();
        if (response.ok) {
          setRoles(result); // Lưu danh sách roles
        } else {
          setMessage("Không thể lấy danh sách vai trò!");
        }
      } catch (error) {
        setMessage("Có lỗi khi lấy danh sách vai trò.");
      }
    };

    fetchRoles();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUp = async () => {
    if (formData.password !== formData.confirmPassword) {
      setMessage("Mật khẩu và xác nhận mật khẩu không khớp!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8017/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Đăng ký thành công! Đang chuyển hướng...");
        setTimeout(() => navigate("/"), 700); // Chuyển hướng sau 2 giây
      } else {
        setMessage(result.message || "Đăng ký thất bại!");
      }
    } catch (error) {
      setMessage("Có lỗi xảy ra. Vui lòng thử lại!");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="app">
      <div className="sign-up-container">
        <h1>Sign Up</h1>
        {message && <p className="message">{message}</p>}
        <div className="input-container">
          <input
            type="text"
            name="fullname"
            placeholder="Full name"
            className="input-field"
            value={formData.fullname}
            onChange={handleChange}
          />
          <input
            type="text"
            name="username"
            placeholder="@Username"
            className="input-field"
            value={formData.username}
            onChange={handleChange}
          />
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="input-field"
              value={formData.password}
              onChange={handleChange}
            />
            <span
              className="toggle-password"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? "👁️" : "🙈"}
            </span>
          </div>
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              className="input-field"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <select
            name="role"
            className="input-field"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="">Chọn vai trò</option>
            {roles.map((role, index) => (
              <option key={index} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
        <div className="button-container">
          <button className="btn-Signup" onClick={handleSignUp}>
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
