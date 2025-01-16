import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AnonymousChat from './pages/AnonymousChat';
import Login from './pages/Login';
import Register from './pages/Register';
import MainChat from './pages/MainChat'; // esse com sidebar etc.

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AnonymousChat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/app/*" element={<MainChat />} />
      </Routes>
    </Router>
  );
}

export default App;
