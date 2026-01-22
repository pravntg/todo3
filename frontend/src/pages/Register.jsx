import { useState } from "react";
import API from "../api/api";
import "../styles/auth.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await API.post("/auth/register", {
        username,
        email,
        password,
      });

      alert("Registration successful! Please login.");
      window.location.href = "/";
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Welcome Onboard!</h2>
        <p className="subtitle">Let’s help you manage your tasks</p>

        <form onSubmit={handleRegister}>
          {/* NAME */}
          <div className="form-group">
            <label>Full Name</label>
            <div className="input-wrapper">
              <i>👤</i>
              <input
                type="text"
                placeholder="Enter your full name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          {/* EMAIL */}
          <div className="form-group">
            <label>Email</label>
            <div className="input-wrapper">
              <i>📧</i>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="form-group">
            <label>Password</label>
            <div className="input-wrapper">
              <i>🔒</i>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

          <button className="auth-btn">Register</button>
        </form>

        <div className="switch">
          Already have an account? <a href="/">Sign In</a>
        </div>
      </div>
    </div>
  );
}
