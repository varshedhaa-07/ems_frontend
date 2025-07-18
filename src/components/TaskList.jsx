import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const TaskList = () => {
  const { empId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("userName"); 
        setUserName(user);

        const response = await axios.get(
          `${process.env.URL}/task/id/${empId}/tasks`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        alert("Failed to fetch tasks for the employee.");
      }
    };

    fetchTasks();
  }, [empId]);

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      console.log("Updating status for task ID:", taskId);

      await axios.put(
        "${process.env.URL}/task/status",
        {
          taskId: taskId,
          status: newStatus,
          username: userName
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.taskId === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      console.error("Failed to update task status:", error);
      alert("Error updating task status.");
    }
  };

  const statusOptions = ["Yet to Start", "In Progress", "Completed"];

  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(90deg, #74c0fc, #b197fc)",
        padding: "30px",
      }}
    >
      <h2 className="mb-4">📋 Tasks for Employee ID: {empId}</h2>
      {tasks.length === 0 ? (
        <p>No tasks assigned yet.</p>
      ) : (
        <ul
          className="list-group w-75"
          style={{
            background: "linear-gradient(90deg, #dc75a9ff, #dbbe74ff)",
            padding: "30px",
          }}
        >
          {tasks.map((task, index) => {
            console.log(task);
            return (
              <li
                key={task.taskId || index}
                className="list-group-item d-flex justify-content-between align-items-center"
                style={{
                  background: "linear-gradient(90deg, #e374fcff, #c6bfdbff)",
                  padding: "20px",
                }}
              >
                <span style={{ fontWeight: "bold" }}>{task.title}</span>

                {task.assignedEmployee.userName === userName ? (
                  <select
                    value={task.status}
                    onChange={(e) =>
                      handleStatusChange(task.taskId, e.target.value)
                    }
                    className="form-select w-25"
                    style={{
                      background: "linear-gradient(90deg, #74c0fc, #b197fc)",
                      border: "1px solid #ced4da",
                      color: "#000", 
                    }}
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span
                    className="badge"
                    style={{
                      background: "linear-gradient(90deg, #74c0fc, #b197fc)",
                      padding: "10px",
                      color: "#000", 
                      borderRadius: "5px",
                    }}
                  >
                    {task.status}
                  </span>
                )}
              </li>
            );})}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
