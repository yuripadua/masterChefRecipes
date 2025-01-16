// // src/pages/AnonymousChat.js
// import React, { useState, useRef, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';
// import api from '../services/api';  // axios instance
// import './AnonymousChat.css';

// export default function AnonymousChat() {
//   const [messages, setMessages] = useState([
//     {
//       role: 'assistant',
//       text: 'Olá, sou seu assistente de receitas! Em que posso ajudar hoje?'
      
//     }
//   ]);
//   const [input, setInput] = useState('');

//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages]);

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMessage = { role: 'user', text: input.trim() };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput('');

//     try {
//       // Se você quiser uma rota anônima, implemente no backend, 
//       // ou simplesmente simule a resposta aqui.
//       // Exemplo: rota: /chat-anon 
//       const res = await api.post('/chat-anon', { message: userMessage.text });
//       const { answer } = res.data;

//       const botMessage = { role: 'assistant', text: answer };
//       setMessages((prev) => [...prev, botMessage]);
//     } catch (error) {
//       console.error(error);
//       setMessages((prev) => [
//         ...prev,
//         { role: 'assistant', text: 'Não foi possível obter resposta no momento.' }
//       ]);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage();
//     }
//   };

//   return (
//     <div className="anon-container">
//       {/* Header com 2 botões */}
//       <header className="anon-header">
//         <Link to="/login" className="header-btn">Login</Link>
//         <Link to="/register" className="header-btn">Cadastre-se</Link>
//       </header>

//       {/* Chat Container */}
//       <div className="anon-chat-container">
//         <h2 className="anon-title">Chat Anônimo</h2>

//         <div className="anon-messages">
//           {messages.map((msg, idx) => (
//             <div
//               key={idx}
//               className={`anon-message ${msg.role === 'user' ? 'anon-user' : 'anon-assistant'}`}
//             >
//               <div className="anon-bubble">
//                 <ReactMarkdown remarkPlugins={[remarkGfm]}>
//                   {msg.text}
//                 </ReactMarkdown>
//               </div>
//             </div>
//           ))}
//           <div ref={messagesEndRef} />
//         </div>

//         <div className="anon-input-container">
//           <textarea
//             className="anon-input"
//             rows={2}
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyPress={handleKeyPress}
//             placeholder="Digite sua dúvida..."
//           />
//           <button className="anon-send-btn" onClick={sendMessage}>
//             Enviar
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


// src/pages/AnonymousChat.js
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import api from '../services/api';
import Header from '../components/Header';
import './AnonymousChat.css';

export default function AnonymousChat() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'Olá! Sou o seu assistente de receitas. O que vamos cozinhar hoje?!'
    }
  ]);
  const [input, setInput] = useState('');

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input.trim() };
    setMessages((prev) => [...prev, userMessage]);

    const newMessages = [...messages, userMessage];
    setInput('');

    try {
      // Exemplo: rota /chat-anon (caso queira), ou simule a resposta
      const res = await api.post('/chat-anon', {
        fullConversation: newMessages, // Array de todas as mensagens
      });      
      const { answer } = res.data;


      const botMessage = { role: 'assistant', text: answer };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: 'Não foi possível obter resposta no momento.' }
      ]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="anon-container">
      {/* Header global */}
      <Header />

      {/* "Barra" de login/register */}
      <div className="anon-topbar">
        <Link to="/login" className="topbar-btn">Login</Link>
        <Link to="/register" className="topbar-btn">Cadastre-se</Link>
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
                  alt={msg.role === 'user' ? 'Você' : 'Bot'}
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
            placeholder="Digite sua dúvida..."
          />
          <button className="anon-send-btn" onClick={sendMessage}>
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
