import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Header from '../components/Header';
import './MainChat.css';

export default function MainChat() {
  const [chats, setChats] = useState([]);
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [clickTimeout, setClickTimeout] = useState(null);
  const doubleClickDelay = 250; // tempo para distinguir single vs doubl
  
  // Para edição inline
  const [editingChatId, setEditingChatId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');

  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  // Checar token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  // Carregar lista de chats
  const loadChats = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await api.get('/chats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setChats(res.data);
    } catch (error) {
      console.error(error);
      alert('Erro ao carregar lista de chats.');
    }
  };

  useEffect(() => {
    loadChats();
  }, []);

  // Carregar um chat específico (histórico)
  const loadChat = async (chatId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await api.get(`/chats/${chatId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(res.data.messages);
      setSelectedChatId(chatId);
      // Cancela edição se existia
      setEditingChatId(null);
    } catch (error) {
      console.error(error);
      alert('Erro ao carregar o chat.');
    }
  };

  // Criar novo chat
  const handleNewChat = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await api.post(
        '/chats/create',
        { title: 'Nova Receita' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Recarrega e seleciona
      await loadChats();
      loadChat(res.data._id);
    } catch (error) {
      console.error(error);
      alert('Erro ao criar chat.');
    }
  };

  // Enviar mensagem
  const handleSendMessage = async () => {
    if (!input.trim() || !selectedChatId) return;

    const userText = input.trim();
    setInput('');

    // Otimista: já mostra a msg do user
    setMessages((prev) => [...prev, { role: 'user', text: userText }]);

    try {
      const token = localStorage.getItem('token');
      const res = await api.post(
        `/chats/${selectedChatId}/message`,
        { text: userText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const { answer } = res.data;
      // Adiciona msg do assistant
      setMessages((prev) => [...prev, { role: 'assistant', text: answer }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: 'Erro ao obter resposta.' }
      ]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Rolar pro final sempre que messages mudar
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Duplo clique no nome do chat => entrar em modo edição
  const handleChatTitleDblClick = (chat) => {
    setEditingChatId(chat._id);
    setEditingTitle(chat.title);
  };

  // Salvar alteração no back
  const saveChatTitle = async (chatId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await api.put(
        `/chats/${chatId}/rename`,
        { newTitle: editingTitle },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Atualiza local no array
      setChats((prev) =>
        prev.map((c) => (c._id === chatId ? { ...c, title: res.data.title } : c))
      );
    } catch (err) {
      console.error(err);
      alert('Erro ao renomear o chat.');
    }
    // Fecha edição
    setEditingChatId(null);
  };

  const handleTitleKeyDown = (e, chatId) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      saveChatTitle(chatId);
    }
  };

  const handleTitleBlur = (chatId) => {
    // Salva quando sair do campo
    saveChatTitle(chatId);
  };

  const handleItemClick = (chat) => {
    // Se já existe um timeout, significa que houve um clique anterior
    if (clickTimeout) {
      // Então isso é um double click
      clearTimeout(clickTimeout);
      setClickTimeout(null);
      // -> Agora executa a lógica de duplo clique
      handleChatTitleDblClick(chat);
    } else {
      // Não existe timeout => agendar um single click
      const timer = setTimeout(() => {
        // Se chegou aqui, não houve segundo clique => single click
        setClickTimeout(null);
        loadChat(chat._id);
      }, doubleClickDelay);

      setClickTimeout(timer);
    }
  };




  return (
    <div className="mainchat-container">
      {/* Header global */}
      <Header />

      <div className="mainchat-content">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-header">
            <h2>Receitas</h2>
            <button className="sidebar-btn" onClick={handleLogout}>
              Sair
            </button>
          </div>
          <button className="newchat-btn" onClick={handleNewChat}>
            Nova Receita
          </button>
          <div className="chat-list">
            {chats.map((chat) => (
              <div
                key={chat._id}
                className={`chat-item ${
                  chat._id === selectedChatId ? 'active' : ''
                }`}
                onClick={() => {
                    // Só seleciona o chat se não estiver em modo de edição
                    if (editingChatId !== chat._id) {
                    //   loadChat(chat._id);
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

        {/* Área de chat */}
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
                    {/* Avatar */}
                    <div className="message-avatar">
                      <img
                        src={
                          msg.role === 'user' ? '/user-avatar.png' : '/bot-avatar.png'
                        }
                        alt={msg.role}
                      />
                    </div>

                    <div className="message-bubble">
                      <ReactMarkdown className="markdown-content" remarkPlugins={[remarkGfm]}>
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
                  placeholder="Digite sua mensagem..."
                />
                <button className="chat-send-btn" onClick={handleSendMessage}>
                  Enviar
                </button>
              </div>
            </>
          ) : (
            <div className="no-chat-selected">
              <p>Selecione um chat ou crie um novo.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
