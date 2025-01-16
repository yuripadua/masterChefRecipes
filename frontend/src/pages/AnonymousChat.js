
// src/pages/AnonymousChat.js
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import api from '../services/api';
import Header from '../components/Header';
import './AnonymousChat.css';

export default function AnonymousChat() {
  // State to manage chat messages
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'Hello! I am your recipe assistant. What shall we cook today?!'
    }
  ]);
  const [input, setInput] = useState('');

  const messagesEndRef = useRef(null);

  // Scroll to the bottom of the chat whenever messages are updated
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Function to send a message
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input.trim() };
    setMessages((prev) => [...prev, userMessage]);

    const newMessages = [...messages, userMessage];
    setInput('');

    try {
      // Example API call to the anonymous chat endpoint
      const res = await api.post('/chat-anon', {
        fullConversation: newMessages, // Array of all chat messages
      });
      const { answer } = res.data;

      const botMessage = { role: 'assistant', text: answer };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: 'Unable to get a response at the moment.' }
      ]);
    }
  };

  // Handle "Enter" key press to send a message
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="anon-container">
      {/* Global Header */}
      <Header />

      {/* Top bar with login/register buttons */}
      <div className="anon-topbar">
        <Link to="/login" className="topbar-btn">Login</Link>
        <Link to="/register" className="topbar-btn">Register</Link>
      </div>

      {/* Chat Container */}
      <div className="anon-chat-wrapper">
        <div className="anon-messages">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`anon-message ${msg.role === 'user' ? 'anon-user' : 'anon-assistant'}`}
            >
              {/* Avatar */}
              <div className="anon-avatar">
                <img
                  src={msg.role === 'user' ? './user-avatar.png' : './bot-avatar.png'}
                  alt={msg.role === 'user' ? 'You' : 'Bot'}
                />
              </div>

              <div className="anon-bubble">
                <ReactMarkdown className="markdown-content" remarkPlugins={[remarkGfm]}>
                  {msg.text}
                </ReactMarkdown>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="anon-input-container">
          <textarea
            className="anon-input"
            rows={2}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your question..."
          />
          <button className="anon-send-btn" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
