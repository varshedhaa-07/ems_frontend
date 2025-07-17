import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const Navbar = ({ isLoggedIn, roles, setIsLoggedIn, onLoginClick }) => {
  const isAdmin =
    roles.includes("ADMIN") || roles.includes("ADMIN") || roles.includes("both");

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    window.location.href = "/"; // Redirect to home
  };

  const navigate = useNavigate();

  const handleAddClick = () => {
    navigate("/add-employee");
  };

  const handleEmployeeClick =() =>{
    navigate("/get-employee");
  };


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4 py-3">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand fw-bold text-primary">
           EMS
        </Link>


        <div className="d-flex gap-2">
          {isAdmin && (
            <button className="btn btn-warning fw-bold text-white" type="button" onClick={handleAddClick}>
              Add
            </button>
          )}

          <button className="btn btn-info fw-bold text-white" type="button" onClick={handleEmployeeClick}>
            Employees
          </button>

          {isLoggedIn ? (
            <button
              className="btn btn-danger fw-bold text-white"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <button
              className="btn btn-info fw-bold text-white"
              onClick={onLoginClick}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
