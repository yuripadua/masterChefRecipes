
// src/pages/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Login.css';
import Header from '../components/Header';

export default function Login() {
  const [email, setEmail] = useState(''); // State to manage email input
  const [password, setPassword] = useState(''); // State to manage password input
  const navigate = useNavigate();

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Make a POST request to authenticate the user
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token); // Store the token in localStorage
      // Redirect to the main logged-in page
      navigate('/app');
    } catch (error) {
      console.error(error);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-container">
      <Header />
      <form className="login-box" onSubmit={handleLogin}>
        <h2 className="login-title">Login</h2>
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />

        <button type="submit" className="login-btn">
          Log In
        </button>

        <p className="login-text">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}
