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
      alert('As senhas não conferem.');
      return;
    }
    try {
      await api.post('/auth/register', {
        email,
        password,
        passwordConfirm: confirmPassword
      });
      alert('Cadastro realizado com sucesso! Faça login.');
      navigate('/login');
    } catch (error) {
      console.error(error);
      alert('Falha no cadastro. Verifique se o e-mail já existe.');
    }
  };

  return (
    <div className="register-container">
        <Header />
      <form className="register-box" onSubmit={handleRegister}>
        <h2 className="register-title">Cadastre-se</h2>
        <input
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="register-input"
        />
        <input
          type="password"
          placeholder="Sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="register-input"
        />
        <input
          type="password"
          placeholder="Confirme sua senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="register-input"
        />

        <button type="submit" className="register-btn">
          Cadastrar
        </button>

        <p className="register-text">
          Já tem conta? <Link to="/login">Fazer login</Link>
        </p>
      </form>
    </div>
  );
}
