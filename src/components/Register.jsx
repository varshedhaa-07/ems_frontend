import { useState } from "react";
import axios from "axios";
import "./Register.css";

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
      const selected = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      );
      setForm({ ...form, [name]: selected });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/register", form);
      alert("Registered Successfully!");
    } catch (error) {
      console.error("Registration Error", error);
      alert("Error while registering");
    }
  };

  return (
    <div className="register-container">
      <h2 className="form-heading">Register</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Full Name</label>
        <input name="name" value={form.name} onChange={handleChange} required />

        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="userName">User Name</label>
        <input
          name="userName"
          value={form.userName}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <label htmlFor="roleNames">Role</label>
        <select
          name="roleNames"
          value={form.roleNames[0] || ""}
          onChange={(e) => setForm({ ...form, roleNames: [e.target.value] })}
>

          <option value="admin">User</option>
          <option value="user">Admin</option>
          <option value="both">Both</option>
        </select>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
