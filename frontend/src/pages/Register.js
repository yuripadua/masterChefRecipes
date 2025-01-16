

// src/pages/Register.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Register.css';
import Header from '../components/Header';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    try {
      await api.post('/auth/register', {
        email,
        password,
        passwordConfirm: confirmPassword,
      });
      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (error) {
      console.error(error);
      alert('Registration failed. Check if the email is already registered.');
    }
  };

  return (
    <div className="register-container">
      <Header />
      <form className="register-box" onSubmit={handleRegister}>
        <h2 className="register-title">Register</h2>
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="register-input"
        />
        <input
          type="password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="register-input"
        />
        <input
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="register-input"
        />

        <button type="submit" className="register-btn">
          Register
        </button>

        <p className="register-text">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
}
