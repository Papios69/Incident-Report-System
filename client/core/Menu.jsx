import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import Button from "@mui/material/Button";
import auth from "../lib/auth-helper";
import { Link, useNavigate, useLocation } from "react-router-dom";

const isActive = (location, path) =>
  location.pathname === path ? "#ff4081" : "#ffffff";

const isPartActive = (location, path) =>
  location.pathname.startsWith(path) ? "#bef67a" : "#ffffff";

export default function Menu() {
  const navigate = useNavigate();
  const location = useLocation();

  const loggedIn = auth.isAuthenticated();
  const currentUser = loggedIn ? loggedIn.user : null;

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          SafeTrack Incident Manager
        </Typography>

        {/* Home */}
        <Link to="/">
          <IconButton
            aria-label="Home"
            sx={{ color: isActive(location, "/") }}
          >
            <HomeIcon />
          </IconButton>
        </Link>

        {/* Users list (public) */}
        <Link to="/users">
          <Button sx={{ color: isActive(location, "/users") }}>Users</Button>
        </Link>

        {/* Incidents (only when signed in) */}
        {loggedIn && (
          <Link to="/incidents">
            <Button sx={{ color: isPartActive(location, "/incidents") }}>
              Incidents
            </Button>
          </Link>
        )}

        {/* Auth links */}
        {!loggedIn && (
          <>
            <Link to="/signup">
              <Button sx={{ color: isActive(location, "/signup") }}>
                Sign up
              </Button>
            </Link>
            <Link to="/signin">
              <Button sx={{ color: isActive(location, "/signin") }}>
                Sign In
              </Button>
            </Link>
          </>
        )}

        {loggedIn && currentUser && (
          <>
            <Link to={`/user/${currentUser._id}`}>
              <Button
                sx={{
                  color: isActive(location, `/user/${currentUser._id}`),
                }}
              >
                My Profile
              </Button>
            </Link>
            <Button
              sx={{ color: "#ffffff" }}
              onClick={() => {
                auth.clearJWT(() => navigate("/"));
              }}
            >
              Sign out
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
