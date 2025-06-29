import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Signup.css"

function Login (){
  const {login} = useAuth();
   const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
   const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await login(email, password);
    if (res.success) {
      setMessage(`Welcome back, ${res.user.name}!`);
      navigate("/home");
    } else {
      setMessage("Incorrect password or user not found.");
    }
  };
  return (
   <div className="container-login">
      <h2>Log In</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Log In</button>
      </form>
      <p>{message}</p>
    </div>
  )
}

export default Login