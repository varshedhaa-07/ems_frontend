import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const TaskList = () => {
  const { empId } = useParams();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `http://localhost:10000/task/id/${empId}/tasks`,
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

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100"
    style={{
        background: "linear-gradient(90deg, #74c0fc, #b197fc)",
        padding: "30px",
      }}
    >
      <h2 className="mb-4">📋 Tasks for Employee ID: {empId}</h2>
      {tasks.length === 0 ? (
        <p>No tasks assigned yet.</p>
      ) : (
        <ul className="list-group"
        style={{
        background: "linear-gradient(90deg, #dc75a9ff, #dbbe74ff)",
        padding: "30px",
      }}
        >
          {tasks.map((task, index) => (
            <li key={task.id || index} className="list-group-item"
            style={{
        background: "linear-gradient(90deg, #e374fcff, #c6bfdbff)",
        padding: "20px",
      }}
            >
              {task.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
