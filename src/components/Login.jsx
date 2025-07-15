import { useState } from "react";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(event) {
    event.preventDefault();
    try {
      const request = await axios.post("https://ems-backend-eodh.onrender.com/api/auth/login", {userName,password,});
      const token = request.data;
      localStorage.setItem("token",token);
      console.log(token);
      alert("Login Successful");
    } catch (e) {
      console.log("Login Error", e);
      alert("Invalid Credentials");
    }
  }

  return (
    <div className="login-container">
      <h2 className="form-heading">Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <label htmlFor="userName">User Name</label>
        <input
          id="userName"
          name="userName"
          value={userName}
          type="text"
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
