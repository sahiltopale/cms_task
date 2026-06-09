import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/register.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    // ✅ validation added
    if (!name || !email || !password) {
      alert("All fields are required");
      return;
    }

    try {
      await api.post("/auth/register", { name, email, password });
      alert("Registration Successful");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Registration Failed");
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h1 className="register-title">Create your account</h1>
        <p className="register-subtitle">Start managing your content today</p>

        <label className="register-label">Name</label>
        <input
          className="register-input"
          type="text"
          placeholder="Jane Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="register-label">Email</label>
        <input
          className="register-input"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="register-label">Password</label>
        <input
          className="register-input"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="register-btn" onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;
