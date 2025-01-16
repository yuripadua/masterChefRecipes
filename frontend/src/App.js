
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importing pages
import AnonymousChat from './pages/AnonymousChat';
import Login from './pages/Login';
import Register from './pages/Register';
import MainChat from './pages/MainChat'; // Main chat page with sidebar, etc.

function App() {
  return (
    <Router>
      <Routes>
        {/* Public anonymous chat accessible at the root path */}
        <Route path="/" element={<AnonymousChat />} />
        
        {/* Login page */}
        <Route path="/login" element={<Login />} />
        
        {/* Registration page */}
        <Route path="/register" element={<Register />} />
        
        {/* Main chat interface with sidebar */}
        <Route path="/app/*" element={<MainChat />} />
      </Routes>
    </Router>
  );
}

export default App;
