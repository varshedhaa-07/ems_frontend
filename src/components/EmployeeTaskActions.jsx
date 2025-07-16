import React from "react";
import { useNavigate } from "react-router-dom";

const EmployeeTaskActions = ({ selectedEmployee, onClose }) => {
  const navigate = useNavigate();

  const roles = JSON.parse(localStorage.getItem("roles") || "[]");
  const isAdmin = roles.includes("admin") || roles.includes("ADMIN");

  const handleAddTask = () => {
    navigate(`/employee/${selectedEmployee.empId}/add-task`);
  };

  const handleListTasks = () => {
    navigate(`/employee/${selectedEmployee.empId}/tasks`);
  };

  return (
    <div className="modal-backdrop d-flex align-items-center justify-content-center"
    style={{
        background: "linear-gradient(90deg, #74c0fc, #b197fc)",
      }}
    >
      <div className="bg-white border rounded p-4 shadow" style={{ minWidth: "300px" }}>
        <h5 className="mb-3">For {selectedEmployee.name}</h5>
        {isAdmin && (
          <button className="btn btn-primary w-100 mb-2" onClick={handleAddTask}>
            ➕ Add Task
          </button>
        )}
        <button className="btn btn-secondary w-100" onClick={handleListTasks}>
          📋 List Tasks
        </button>
        <button className="btn btn-danger w-100 mt-3" onClick={onClose}>
          ❌ Close
        </button>
      </div>
    </div>
  );
};

export default EmployeeTaskActions;
