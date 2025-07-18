import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    userName: "",
    roleNames: [],
  });

  const navigate=useNavigate();
   const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === "roleNames") {
    if (value === "Both") {
      setForm({ ...form, [name]: ["USER", "ADMIN"] });
    } else {
      setForm({ ...form, [name]: [value.toUpperCase()] });
    }
  } else {
    setForm({ ...form, [name]: value });
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${process.env.URL}/employee`, form,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
      alert("Employee Added Successfully!");
      navigate("/get-employee");
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

          <label>Roles</label>
          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="checkbox"
              id="userRole"
              name="roleNames"
              value="USER"
              checked={form.roleNames.includes("USER")}
              onChange={(e) => {
                const role = e.target.value;
                const updatedRoles = e.target.checked
                  ? [...form.roleNames, role]
                  : form.roleNames.filter((r) => r !== role);
                setForm({ ...form, roleNames: updatedRoles });
              }}
            />
            <label className="form-check-label" htmlFor="userRole">
              User
            </label>
          </div>

          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="adminRole"
              name="roleNames"
              value="ADMIN"
              checked={form.roleNames.includes("ADMIN")}
              onChange={(e) => {
                const role = e.target.value;
                const updatedRoles = e.target.checked
                  ? [...form.roleNames, role]
                  : form.roleNames.filter((r) => r !== role);
                setForm({ ...form, roleNames: updatedRoles });
              }}
            />
            <label className="form-check-label" htmlFor="adminRole">
              Admin
            </label>
          </div>

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
