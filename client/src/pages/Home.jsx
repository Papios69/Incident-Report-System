import { getAuth, isAuthenticated } from "../services/AuthService";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const auth = getAuth();

  return (
    <div className="home-container">
      <div className="home-card">
        <h1 className="home-title">Welcome to the Incident Reporting System</h1>

        {isAuthenticated() ? (
          <p className="home-text">
            Hello, <strong>{auth.user.name}</strong>! Use the options below to
            manage incidents or view your profile.
          </p>
        ) : (
          <p className="home-text">
            Please{" "}
            <Link to="/signin" className="home-link">
              sign in
            </Link>{" "}
            or{" "}
            <Link to="/signup" className="home-link">
              create an account
            </Link>{" "}
            to report and manage incidents.
          </p>
        )}

        <div className="home-actions">
          <Link to="/incidents">
            <button className="home-button primary">View Incidents</button>
          </Link>

          {isAuthenticated() && (
            <Link to="/profile">
              <button className="home-button">My Profile</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
