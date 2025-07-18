import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const AddTask = () => {
  const { empId } = useParams();
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a task title.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${process.env.URL}/task/id/${empId}`,
        { title },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Task added successfully!");
      setTitle(""); // Clear the input
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task.");
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100"
    style={{
        background: "linear-gradient(90deg, #74c0fc, #b197fc)",
        padding: "30px",
      }}
    >
      <h2 className="mb-4">➕ Add Task for Employee ID: {empId}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Task Title:
          </label>
          <input style={{
        background: "linear-gradient(90deg, #c2bbbeff, #be81b9ff)",
        padding: "18px",
      }}
            type="text"
            id="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
