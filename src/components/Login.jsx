import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Login = ({ onLoginSuccess = () => {} }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();
    try {
      const response = await axios.post("https://ems-backend-eodh.onrender.com/api/auth/login", {
        userName,
        password,
      });

      const { token, userName: name, roles } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("userName", name);
      localStorage.setItem("roles", JSON.stringify(roles));

      alert("Login Successful");

      onLoginSuccess(); 
      navigate("/");    
    } catch (e) {
      console.log("Login Error", e);
      alert("Invalid Credentials");
    }
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(90deg, #74c0fc, #b197fc)",
      }}
    >
      <div className="bg-white p-4 rounded shadow" style={{ width: "350px" }}>
        <h2 className="text-center text-danger mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="userName" className="form-label">User Name</label>
            <input
              id="userName"
              name="userName"
              type="text"
              className="form-control"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn w-100 fw-bold text-white"
            style={{ background: "linear-gradient(90deg, #74c0fc, #b197fc)" }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
