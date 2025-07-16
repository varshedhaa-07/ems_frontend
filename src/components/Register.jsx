import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    userName: "",
    roleNames: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "roleNames") {
      setForm({ ...form, [name]: [value] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:10000/api/auth/register", form);
      alert("Registered Successfully!");
    } catch (error) {
      console.error("Registration Error", error);
      alert("Error while registering");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: "linear-gradient(90deg, #74c0fc, #b197fc)" }}
    >
      <div className="bg-white p-4 rounded shadow" style={{ width: "400px" }}>
        <h2 className="text-center text-danger mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="userName" className="form-label">
              User Name
            </label>
            <input
              type="text"
              className="form-control"
              name="userName"
              value={form.userName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="roleNames" className="form-label">
              Role
            </label>
            <select
              className="form-select"
              name="roleNames"
              value={form.roleNames[0] || ""}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Select a role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="both">Both</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn w-100 fw-bold text-white"
            style={{
              background: "linear-gradient(90deg, #74c0fc, #b197fc)",
            }}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
