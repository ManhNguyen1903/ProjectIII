import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./SignUp.css";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Khai báo navigate

  const handleSignUpClick = () => {
    navigate("/"); // Chuyển hướng về trang đăng nhập
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="app">
      <div className="sign-up-container">
        <h1>Sign Up</h1>
        <div className="input-container">
          <input type="text" placeholder="Full name" className="input-field" />
          <input type="text" placeholder="@Username" className="input-field" />
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input-field"
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
              placeholder="Enter Password"
              className="input-field"
            />
          </div>
          <input type="text" placeholder="Role" className="input-field" />
        </div>
        <div className="button-container">
          <button className="btn-Signup" onClick={handleSignUpClick}>
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
