
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Header from '../components/Header';
import './MainChat.css';

export default function MainChat() {
  const [chats, setChats] = useState([]); // Stores the list of chats
  const [selectedChatId, setSelectedChatId] = useState(null); // Stores the selected chat ID
  const [messages, setMessages] = useState([]); // Stores the chat messages
  const [input, setInput] = useState(''); // Stores the message input
  const [clickTimeout, setClickTimeout] = useState(null); // Timer for single vs double-click logic
  const doubleClickDelay = 250; // Time in milliseconds to distinguish single and double-click

  // For inline chat title editing
  const [editingChatId, setEditingChatId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');

  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  // Check if user is logged in by verifying token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  // Load chat list from the server
  const loadChats = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await api.get('/chats', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setChats(res.data);
    } catch (error) {
      console.error(error);
      alert('Error loading chat list.');
    }
  };

  useEffect(() => {
    loadChats();
  }, []);

  // Load messages for a specific chat
  const loadChat = async (chatId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await api.get(`/chats/${chatId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(res.data.messages);
      setSelectedChatId(chatId);
      setEditingChatId(null); // Exit editing mode
    } catch (error) {
      console.error(error);
      alert('Error loading chat.');
    }
  };

  // Create a new chat
  const handleNewChat = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await api.post(
        '/chats/create',
        { title: 'New Recipe' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await loadChats(); // Reload chat list
      loadChat(res.data._id); // Automatically open the new chat
    } catch (error) {
      console.error(error);
      alert('Error creating chat.');
    }
  };

  // Send a message
  const handleSendMessage = async () => {
    if (!input.trim() || !selectedChatId) return;

    const userText = input.trim();
    setInput('');

    // Optimistic UI update: show user's message immediately
    setMessages((prev) => [...prev, { role: 'user', text: userText }]);

    try {
      const token = localStorage.getItem('token');
      const res = await api.post(
        `/chats/${selectedChatId}/message`,
        { text: userText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const { answer } = res.data;
      setMessages((prev) => [...prev, { role: 'assistant', text: answer }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: 'Error fetching response.' },
      ]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Scroll to the latest message whenever the messages list changes
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Enter editing mode on double-clicking a chat title
  const handleChatTitleDblClick = (chat) => {
    setEditingChatId(chat._id);
    setEditingTitle(chat.title);
  };

  // Save the edited chat title
  const saveChatTitle = async (chatId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await api.put(
        `/chats/${chatId}/rename`,
        { newTitle: editingTitle },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setChats((prev) =>
        prev.map((c) => (c._id === chatId ? { ...c, title: res.data.title } : c))
      );
    } catch (err) {
      console.error(err);
      alert('Error renaming chat.');
    }
    setEditingChatId(null); // Exit editing mode
  };

  const handleTitleKeyDown = (e, chatId) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveChatTitle(chatId);
    }
  };

  const handleTitleBlur = (chatId) => {
    saveChatTitle(chatId); // Save on blur
  };

  const handleItemClick = (chat) => {
    if (clickTimeout) {
      clearTimeout(clickTimeout);
      setClickTimeout(null);
      handleChatTitleDblClick(chat); // Double-click logic
    } else {
      const timer = setTimeout(() => {
        setClickTimeout(null);
        loadChat(chat._id); // Single-click logic
      }, doubleClickDelay);
      setClickTimeout(timer);
    }
  };

  return (
    <div className="mainchat-container">
      {/* Global Header */}
      <Header />

      <div className="mainchat-content">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-header">
            <h2>Recipes</h2>
            <button className="sidebar-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
          <button className="newchat-btn" onClick={handleNewChat}>
            New Recipe
          </button>
          <div className="chat-list">
            {chats.map((chat) => (
              <div
                key={chat._id}
                className={`chat-item ${
                  chat._id === selectedChatId ? 'active' : ''
                }`}
                onClick={() => {
                  if (editingChatId !== chat._id) {
                    handleItemClick(chat);
                  }
                }}
              >
                {editingChatId === chat._id ? (
                  <input
                    className="chat-title-input"
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    onKeyDown={(e) => handleTitleKeyDown(e, chat._id)}
                    onBlur={() => handleTitleBlur(chat._id)}
                    autoFocus
                  />
                ) : (
                  <span
                    onDoubleClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      handleChatTitleDblClick(chat);
                    }}
                  >
                    {chat.title}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="chat-area">
          {selectedChatId ? (
            <>
              <div className="chat-messages">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`message ${
                      msg.role === 'user' ? 'message-user' : 'message-assistant'
                    }`}
                  >
                    <div className="message-avatar">
                      <img
                        src={
                          msg.role === 'user'
                            ? '/user-avatar.png'
                            : '/bot-avatar.png'
                        }
                        alt={msg.role}
                      />
                    </div>
                    <div className="message-bubble">
                      <ReactMarkdown
                        className="markdown-content"
                        remarkPlugins={[remarkGfm]}
                      >
                        {msg.text}
                      </ReactMarkdown>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="chat-input-container">
                <textarea
                  className="chat-input"
                  rows={2}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                />
                <button className="chat-send-btn" onClick={handleSendMessage}>
                  Send
                </button>
              </div>
            </>
          ) : (
            <div className="no-chat-selected">
              <p>Select a chat or create a new one.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
