import { getAuth, signout, isAuthenticated } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();

  if (!isAuthenticated()) {
    navigate("/signin");
    return null;
  }

  const auth = getAuth();

  const handleLogout = () => {
    signout();
    navigate("/signin");
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1 className="profile-title">My Profile</h1>

        <div className="profile-field">
          <span className="profile-label">Name:</span>
          <span className="profile-value">{auth.user.name}</span>
        </div>

        <div className="profile-field">
          <span className="profile-label">Email:</span>
          <span className="profile-value">{auth.user.email}</span>
        </div>

        <button className="profile-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
