// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate
// import "./Login.css"; // Import file CSS

// function Login() {
//   // State để kiểm tra trạng thái hiển thị mật khẩu
//   const [showPassword, setShowPassword] = useState(false);

//   // Hàm thay đổi trạng thái hiện/ẩn mật khẩu
//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   // Sử dụng useNavigate để điều hướng
//   const navigate = useNavigate();

//   // Hàm xử lý khi nhấn nút Sign up
// const handleSignUpClick = () => {
//   navigate("/signup"); // Chuyển đến trang SignUp
// };
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   // Dữ liệu người dùng mẫu (Giả sử lấy từ backend)
//   const users = [
//     { username: "admin", password: "1", role: "admin" },
//     { username: "employee", password: "emp123", role: "employee" },
//     { username: "chef", password: "chef123", role: "chef" },
//   ];

//   // Hàm xử lý đăng nhập
//   const handleLogin = () => {
//     // Tìm người dùng khớp thông tin đăng nhập
//     const user = users.find(
//       (u) => u.username === username && u.password === password
//     );

//     if (user) {
//       // Nếu đăng nhập thành công, điều hướng theo quyền
//       if (user.role === "admin") {
//         navigate("/admin");
//       } else if (user.role === "employee") {
//         navigate("/employee");
//       } else if (user.role === "chef") {
//         navigate("/chef");
//       }
//     } else {
//       alert("Invalid username or password!");
//     }
//   };

//   return (
//     <div className="app">
//       <div className="login-container">
//         <h1>Welcome</h1>
//         <h2>The Coffee</h2>
//         <div className="input-container">
//           {/* Ô nhập tài khoản */}
//           <input
//             type="text"
//             placeholder="@Username"
//             className="input-field"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           {/* Ô nhập mật khẩu và biểu tượng mắt */}
//           <div className="password-container">
//             <input
//               type={showPassword ? "text" : "password"} // Đổi giữa "text" và "password"
//               placeholder="Password"
//               className="input-field"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <span
//               className="toggle-password"
//               onClick={togglePasswordVisibility}
//             >
//               {showPassword ? "👁️" : "🙈"} {/* Biểu tượng mắt */}
//             </span>
//           </div>
//           {/* Dòng Quên mật khẩu */}
//           <a href="#" className="forgot-password">
//             Forgot Password?
//           </a>
//         </div>
//         {/* Các nút đăng nhập và đăng ký */}
//         <div className="button-container">
//           <button className="btn-Login" onClick={handleLogin}>
//             Log in
//           </button>
//           {/* Nút Sign up điều hướng tới trang đăng ký */}
//           <button className="btn-Signup" onClick={handleSignUpClick}>
//             Sign up
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Hàm kiểm tra trạng thái hiển thị mật khẩu
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Hàm xử lý đăng nhập
  const handleLogin = () => {
    // Kiểm tra thông tin đăng nhập (giả sử bạn sẽ kiểm tra qua API)
    if (username === "admin" && password === "1") {
      // Nếu đúng tài khoản admin, chuyển hướng tới trang Admin
      navigate("/admin");
    } else if (username === "employee" && password === "1") {
      // Nếu đúng tài khoản nhân viên, chuyển hướng tới trang Staff
      navigate("/employee");
    } else if (username === "chef" && password === "1") {
      // Nếu đúng tài khoản nhân viên, chuyển hướng tới trang Staff
      navigate("/chef");
    } else {
      alert("Thông tin đăng nhập không đúng!");
    }
  };

  return (
    <div className="app">
      <div className="login-container">
        <h1>Welcome</h1>
        <h2>The Coffee</h2>
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
            <span
              className="toggle-password"
              onClick={togglePasswordVisibility}
            >
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
