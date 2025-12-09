import { BrowserRouter, Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import IncidentDetail from "./pages/IncidentDetail";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import { isAuthenticated, signout, getAuth } from "./services/AuthService";
import "./App.css";

function Navbar() {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = () => {
    signout();
    navigate("/signin");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">

        <Link to="/" className="navbar-home">
          Home
        </Link>
        <Link to="/incidents" className="navbar-link">
          Incidents
        </Link>
      </div>

      <div className="navbar-right">
        {isAuthenticated() ? (
          <>
            <span className="navbar-user">
              Welcome, {auth?.user?.name || auth?.user?.email}
            </span>

            <Link to="/profile" className="navbar-link-button">
              My Profile
            </Link>
          </>
        ) : (
          <>
            <button
              className="navbar-button"
              onClick={() => navigate("/signin")}
            >
              Sign In
            </button>
            <button
              className="navbar-button navbar-button-secondary"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/incidents" element={<Dashboard />} />
        <Route path="/incidents/:id" element={<IncidentDetail />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        {/* safety redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
