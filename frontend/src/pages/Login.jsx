import { useState } from "react";
import API from "../api/api";
import "../styles/auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Welcome Back!</h2>
        <p className="subtitle">Let’s continue managing your tasks</p>

        <form onSubmit={handleLogin}>
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

          <div className="forgot">
            <a href="#">Forgot Password?</a>
          </div>

          {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

          <button className="auth-btn">Sign In</button>
        </form>

        <div className="switch">
          Don’t have an account? <a href="/register">Sign Up</a>
        </div>
      </div>
    </div>
  );
}

