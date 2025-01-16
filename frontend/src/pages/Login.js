// src/pages/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Login.css';
import Header from '../components/Header';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      // Redireciona para a página principal logada
      navigate('/app');
    } catch (error) {
      console.error(error);
      alert('Falha no login. Verifique suas credenciais.');
    }
  };

  return (
    <div className="login-container">
        <Header />
      <form className="login-box" onSubmit={handleLogin}>
        <h2 className="login-title">Login</h2>
        <input
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />

        <button type="submit" className="login-btn">
          Entrar
        </button>

        <p className="login-text">
          Não tem uma conta? <Link to="/register">Cadastre-se</Link>
        </p>
      </form>
    </div>
  );
}
