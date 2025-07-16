import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const AddEmployee = () => {
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
      const selected = Array.from(e.target.selectedOptions, (option) => option.value);
      setForm({ ...form, [name]: selected });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:10000/employee", form,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
      alert("Employee Added Successfully!");
    } catch (error) {
      console.error("Error Adding Employee", error);
      alert("Error while adding employee");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: "linear-gradient(90deg, #74c0fc, #b197fc)" }}
    >
      <div className="bg-white p-4 rounded shadow" style={{ width: "400px" }}>
        <h2 className="text-center text-danger mb-4">Add Employee</h2>
        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input
            className="form-control mb-3"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            className="form-control mb-3"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label>User Name</label>
          <input
            className="form-control mb-3"
            name="userName"
            value={form.userName}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            className="form-control mb-3"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <label>Role</label>
          <select
            name="roleNames"
            className="form-select mb-3"
            value={form.roleNames[0] || ""}
            onChange={(e) => setForm({ ...form, roleNames: [e.target.value] })}
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="both">Both</option>
          </select>

          <button
            type="submit"
            className="btn w-100 fw-bold text-white"
            style={{ background: "linear-gradient(90deg, #74c0fc, #b197fc)" }}
          >
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
