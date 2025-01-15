// // frontend/src/components/ChatBot.js
// import React, { useState } from 'react';
// import api from '../services/api';

// function ChatBot() {
//   const [input, setInput] = useState('');
//   const [response, setResponse] = useState('');

//   const handleSend = async () => {
//     try {
//       const res = await api.post('/chat', { userMessage: input });
//       setResponse(res.data.answer);
//     } catch (err) {
//       console.error(err);
//       setResponse('Erro ao se comunicar com o servidor');
//     }
//   };

//   return (
//     <div>
//       <h2>ChatBot de Receitas</h2>
//       <textarea
//         rows="3"
//         cols="50"
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//         placeholder="Digite sua dúvida sobre receitas..."
//       />
//       <br />
//       <button onClick={handleSend}>Enviar</button>
//       <div>
//         <strong>Resposta:</strong> {response}
//       </div>
//     </div>
//   );
// }

// export default ChatBot;



// frontend/src/components/ChatBot.js
// import React, { useState } from 'react';
// import api from '../services/api';

// function ChatBot() {
//   // Vamos manter um array de mensagens no estado
//   // Cada item: { role: 'user'|'assistant', text: '...' }
//   const [messages, setMessages] = useState([
//     { role: 'assistant', text: 'Olá, sou seu assistente de receitas. Em que posso ajudar?' }
//   ]);
//   const [input, setInput] = useState('');

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     // Adiciona a msg do usuário no estado
//     const newUserMessage = { role: 'user', text: input.trim() };
//     setMessages((prev) => [...prev, newUserMessage]);

//     try {
//       // Faz a requisição ao back:
//       const res = await api.post('/chat/message', {
//         userMessage: input.trim(),
//       });
//       const { answer } = res.data;

//       // Adiciona a resposta do assistente
//       const newAssistantMessage = { role: 'assistant', text: answer };
//       setMessages((prev) => [...prev, newAssistantMessage]);
//     } catch (err) {
//       console.error(err);
//       // Em caso de erro, adiciona no chat
//       setMessages((prev) => [
//         ...prev,
//         { role: 'assistant', text: 'Desculpe, houve um erro ao consultar o servidor.' }
//       ]);
//     }

//     setInput('');
//   };

//   return (
//     <div style={{ margin: '0 auto', maxWidth: '600px' }}>
//       <h2>ChatBot de Receitas (Gemini)</h2>

//       <div style={{ border: '1px solid #ccc', padding: '8px', height: '300px', overflowY: 'auto' }}>
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             style={{
//               textAlign: msg.role === 'user' ? 'right' : 'left',
//               margin: '5px 0'
//             }}
//           >
//             <strong>{msg.role === 'user' ? 'Você' : 'ChefBot'}:</strong> {msg.text}
//           </div>
//         ))}
//       </div>

//       <div style={{ marginTop: '10px' }}>
//         <textarea
//           rows={3}
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Pergunte algo sobre receitas..."
//           style={{ width: '100%', resize: 'none' }}
//         />
//         <button onClick={sendMessage} style={{ marginTop: '5px' }}>
//           Enviar
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ChatBot;




// import React, { useState } from 'react';
// import api from '../services/api';
// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';

// import './ChatBot.css'; // Importa um CSS externo (ver exemplo abaixo)

// function ChatBot() {
//   const [messages, setMessages] = useState([
//     {
//       role: 'assistant',
//       text: 'Olá, sou seu assistente de receitas! Em que posso ajudar hoje?'
//     }
//   ]);
//   const [input, setInput] = useState('');

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     // Adiciona a msg do usuário no estado
//     const newUserMessage = { role: 'user', text: input.trim() };
//     setMessages((prev) => [...prev, newUserMessage]);

//     // Limpa o campo imediatamente
//     setInput('');

//     try {
//       // Faz a requisição ao back
//       const res = await api.post('/chat/message', {
//         userMessage: newUserMessage.text,
//       });

//       const { answer } = res.data;

//       // Adiciona a resposta do assistente
//       const newAssistantMessage = { role: 'assistant', text: answer };
//       setMessages((prev) => [...prev, newAssistantMessage]);
//     } catch (error) {
//       console.error(error);
//       // Em caso de erro, adiciona no chat
//       setMessages((prev) => [
//         ...prev,
//         {
//           role: 'assistant',
//           text: 'Desculpe, houve um erro ao consultar o servidor.'
//         }
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
//     <div className="chat-container">
//       <h2 className="chat-title">ChefBot - Receitas</h2>
//       <div className="chat-messages">
//         {messages.map((msg, idx) => (
//           <div
//             key={idx}
//             className={`message ${msg.role === 'user' ? 'message-user' : 'message-assistant'}`}
//           >
//             <div className="message-bubble">
//               {/* Renderiza texto como Markdown */}
//               <ReactMarkdown remarkPlugins={[remarkGfm]}>
//                 {msg.text}
//               </ReactMarkdown>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="chat-input-container">
//         <textarea
//           className="chat-input"
//           rows={3}
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyPress={handleKeyPress}
//           placeholder="Digite sua dúvida sobre receitas..."
//         />
//         <button className="chat-send-btn" onClick={sendMessage}>
//           Enviar
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ChatBot;




// import React, { useState, useEffect, useRef } from 'react';
// import api from '../services/api';
// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';

// import './ChatBot.css';

// function ChatBot() {
//   const [messages, setMessages] = useState([
//     {
//       role: 'assistant',
//       text: 'Olá, sou seu assistente de receitas! Em que posso ajudar hoje?'
//     }
//   ]);
//   const [input, setInput] = useState('');

//   // Ref para o “marcador” no final da lista
//   const messagesEndRef = useRef(null);

//   // Sempre que messages mudar, rola para o final
//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages]);

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const newUserMessage = { role: 'user', text: input.trim() };
//     setMessages((prev) => [...prev, newUserMessage]);
//     setInput('');

//     try {
//       const res = await api.post('/chat/message', {
//         userMessage: newUserMessage.text,
//       });
//       const { answer } = res.data;

//       const newAssistantMessage = { role: 'assistant', text: answer };
//       setMessages((prev) => [...prev, newAssistantMessage]);
//     } catch (error) {
//       console.error(error);
//       setMessages((prev) => [
//         ...prev,
//         {
//           role: 'assistant',
//           text: 'Desculpe, houve um erro ao consultar o servidor.'
//         }
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
//     <div className="chat-container">
//       <h2 className="chat-title">ChefBot - Receitas</h2>
//       <div className="chat-messages">
//         {messages.map((msg, idx) => (
//           <div
//             key={idx}
//             className={`message ${msg.role === 'user' ? 'message-user' : 'message-assistant'}`}
//           >
//             <div className="message-bubble">
//               <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.text}</ReactMarkdown>
//             </div>
//           </div>
//         ))}
//         {/* Div “marcador” que ficará sempre no final das mensagens */}
//         <div ref={messagesEndRef} />
//       </div>

//       <div className="chat-input-container">
//         <textarea
//           className="chat-input"
//           rows={3}
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyPress={handleKeyPress}
//           placeholder="Digite sua dúvida sobre receitas..."
//         />
//         <button className="chat-send-btn" onClick={sendMessage}>
//           Enviar
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ChatBot;



// frontend/src/components/ChatBot.js
// import React, { useState, useRef, useEffect } from 'react';
// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';
// import api from '../services/api';

// import './ChatBot.css';

// function ChatBot() {
//   const [messages, setMessages] = useState([
//     {
//       role: 'assistant',
//       text: 'Olá, sou seu assistente de receitas! Em que posso ajudar hoje?'
//     }
//   ]);
//   const [input, setInput] = useState('');

//   const messagesEndRef = useRef(null);

//   // Sempre que messages mudar, rola para o final
//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages]);

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const newUserMessage = { role: 'user', text: input.trim() };
//     setMessages((prev) => [...prev, newUserMessage]);
//     setInput('');

//     try {
//       const res = await api.post('/chat/message', {
//         userMessage: newUserMessage.text,
//       });
//       const { answer } = res.data;

//       const newAssistantMessage = { role: 'assistant', text: answer };
//       setMessages((prev) => [...prev, newAssistantMessage]);
//     } catch (error) {
//       console.error(error);
//       setMessages((prev) => [
//         ...prev,
//         { role: 'assistant', text: 'Desculpe, houve um erro ao consultar o servidor.' }
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
//     <div className="chat-container">
//       <div className="chat-messages">
//         {messages.map((msg, idx) => (
//           <div
//             key={idx}
//             className={`message ${msg.role === 'user' ? 'message-user' : 'message-assistant'}`}
//           >
//             <div className="message-bubble">
//               <ReactMarkdown 
//               className="markdown-content" 
//               remarkPlugins={[remarkGfm]}>
//                 {msg.text}
//               </ReactMarkdown>
//             </div>
//           </div>
//         ))}
//         <div ref={messagesEndRef} />
//       </div>

//       <div className="chat-input-container">
//         <textarea
//           className="chat-input"
//           rows={3}
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyPress={handleKeyPress}
//           placeholder="Digite sua dúvida sobre receitas..."
//         />
//         <button className="chat-send-btn" onClick={sendMessage}>
//           Enviar
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ChatBot;




import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import api from '../services/api';

import './ChatBot.css';

// Exemplos de caminho para imagens (pode ser /assets, public/images, etc.)
import botAvatar from '../assets/bot-avatar.png';
import userAvatar from '../assets/user-avatar.png';

function ChatBot() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'Olá, sou seu assistente de receitas! Em que posso ajudar hoje?'
    }
  ]);
  const [input, setInput] = useState('');

  const messagesEndRef = useRef(null);

  // Sempre que messages mudar, rola para o final
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newUserMessage = { role: 'user', text: input.trim() };
    setMessages((prev) => [...prev, newUserMessage]);
    setInput('');

    try {
      const res = await api.post('/chat/message', {
        userMessage: newUserMessage.text,
      });
      const { answer } = res.data;

      const newAssistantMessage = { role: 'assistant', text: answer };
      setMessages((prev) => [...prev, newAssistantMessage]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: 'Desculpe, houve um erro ao consultar o servidor.' }
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
    <div className="chat-container">
      {/* HEADER BAR */}
      <div className="chat-header">
        <img
          src={botAvatar}
          alt="Master Chef Recipes Bot"
          className="header-avatar"
        />
        <h2>Master Chef Recipes Bot</h2>
      </div>

      {/* LISTA DE MENSAGENS */}
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`message ${msg.role === 'user' ? 'message-user' : 'message-assistant'}`}
          >
            {/* Avatar ao lado da mensagem */}
            <div className="message-avatar">
              <img
                src={msg.role === 'user' ? userAvatar : botAvatar}
                alt={msg.role === 'user' ? 'Você' : 'Bot'}
              />
            </div>

            <div className="message-bubble">
              <ReactMarkdown className="markdown-content" remarkPlugins={[remarkGfm]}>
                {msg.text}
              </ReactMarkdown>
            </div>
          </div>
        ))}
        {/* "Marcador" para rolar ao final */}
        <div ref={messagesEndRef} />
      </div>

      {/* CAMPO DE TEXTO + BOTÃO SEND */}
      <div className="chat-input-container">
        <textarea
          className="chat-input"
          rows={2}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Digite sua dúvida sobre receitas..."
        />
        <button className="chat-send-btn" onClick={sendMessage}>
          Enviar
        </button>
      </div>
    </div>
  );
}

export default ChatBot;
