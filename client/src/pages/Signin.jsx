import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signin } from "../services/AuthService";
import "./Signin.css";

const Signin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signin(form);
      navigate("/"); // Redirect to Home
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <h1 className="signin-title">Sign In</h1>

        {error && <p className="signin-error">{error}</p>}

        <form onSubmit={handleSubmit} className="signin-form">
          <div className="signin-field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="signin-field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="signin-button">
            Sign In
          </button>
        </form>

        <p className="signin-footer">
          Don't have an account?{" "}
          <a href="/signup" className="signin-link">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signin;
