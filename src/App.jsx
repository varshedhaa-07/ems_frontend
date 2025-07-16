import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import AddEmployee from "./components/AddEmployee";
import GetEmployee from "./components/GetEmployee";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";


function App() {
  const [modalType, setModalType] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const storedRoles = JSON.parse(localStorage.getItem("roles") || "[]");
    setRoles(storedRoles);
  }, [isLoggedIn]);

  const openLogin = () => setModalType("login");
  const openRegister = () => setModalType("register");
  const closeModal = () => setModalType(null);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    const storedRoles = JSON.parse(localStorage.getItem("roles") || "[]");
    setRoles(storedRoles);
    closeModal();
  };

  return (
    <>
      <Navbar
        onLoginClick={openLogin}
        isLoggedIn={isLoggedIn}
        roles={roles}
        setIsLoggedIn={setIsLoggedIn}
      />

      {/* Routing to pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-employee" element={<AddEmployee />} />
        <Route path="/get-employee" element={<GetEmployee />} />
        <Route path="/employee/:empId/add-task" element={<AddTask />} />
        <Route path="/employee/:empId/tasks" element={<TaskList />} />
      </Routes>

      {/* Login Modal */}
      <Modal isOpen={modalType === "login"} onClose={closeModal}>
        <Login onLoginSuccess={handleLoginSuccess} />
        <p className="toggle-text text-center mt-3">
          No account?{" "}
          <span
            className="toggle-link text-primary"
            onClick={openRegister}
            style={{ cursor: "pointer" }}
          >
            Create one
          </span>
        </p>
      </Modal>

      {/* Register Modal */}
      <Modal isOpen={modalType === "register"} onClose={closeModal}>
        <Register />
        <p className="toggle-text text-center mt-3">
          Already have an account?{" "}
          <span
            className="toggle-link text-primary"
            onClick={openLogin}
            style={{ cursor: "pointer" }}
          >
            Login
          </span>
        </p>
      </Modal>

      <Footer />
    </>
  );
}

export default App;
