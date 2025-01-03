import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(""); // Thông báo trạng thái
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra nếu người dùng đã đăng nhập rồi (token đã có trong localStorage)
    if (localStorage.getItem("token")) {
      navigate("/admin"); // Điều hướng người dùng ngay lập tức
    }
  }, [navigate]);

  // Hàm kiểm tra trạng thái hiển thị mật khẩu
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Hàm xử lý đăng nhập
  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8017/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (response.ok) {
        // Lưu token vào localStorage nếu đăng nhập thành công
        localStorage.setItem("token", result.token);

        // Điều hướng theo vai trò
        switch (result.role) {
          case "Admin":
            navigate("/admin");
            break;
          case "Nhân viên order":
            navigate("/employee");
            break;
          case "Nhân viên bếp":
            navigate("/chef");
            break;
          default:
            alert("Không có quyền truy cập!");
            break;
        }
      } else {
        setMessage(result.message || "Thông tin đăng nhập không đúng!");
      }
    } catch (error) {
      setMessage("Có lỗi xảy ra. Vui lòng thử lại!");
    }
  };

  return (
    <div className="app">
      <div className="login-container">
        <h1>Welcome</h1>
        <h2>The Coffee</h2>
        {message && <p className="message">{message}</p>} {/* Thông báo lỗi hoặc thông điệp */}
        <div className="input-container">
          <input
            type="text"
            placeholder="@Username"
            className="input-field"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="toggle-password" onClick={togglePasswordVisibility}>
              {showPassword ? "👁️" : "🙈"}
            </span>
          </div>
          <a href="#" className="forgot-password">
            Forgot Password?
          </a>
        </div>
        <div className="button-container">
          <button className="btn-Login" onClick={handleLogin}>
            Log in
          </button>
          <button className="btn-Signup" onClick={() => navigate("/signup")}>
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
