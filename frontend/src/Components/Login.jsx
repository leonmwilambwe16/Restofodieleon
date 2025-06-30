import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../Components/Login.css";

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      setMessage(`Welcome back, ${res.user.name}!`);
      navigate("/home");
    } else {
      
      setMessage(res.message || "Incorrect password or user not found.");
    }
  };

  const handleInputChange = (setter) => (e) => {
    setMessage("");
    setter(e.target.value);
  };

  return (
    <div className="container-login">
      <h2>Log In</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleInputChange(setEmail)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handleInputChange(setPassword)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Login;
