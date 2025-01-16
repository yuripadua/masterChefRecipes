// import React, { useState, useRef, useEffect } from 'react';
// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';
// import api from '../services/api';

// import './ChatBot.css';

// // Exemplos de caminho para imagens (pode ser /assets, public/images, etc.)
// import botAvatar from '../assets/bot-avatar.png';
// import userAvatar from '../assets/user-avatar.png';

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
//       {/* HEADER BAR */}
//       <div className="chat-header">
//         <img
//           src={botAvatar}
//           alt="Master Chef Recipes Bot"
//           className="header-avatar"
//         />
//         <h2>Master Chef Recipes Bot</h2>
//       </div>

//       {/* LISTA DE MENSAGENS */}
//       <div className="chat-messages">
//         {messages.map((msg, idx) => (
//           <div
//             key={idx}
//             className={`message ${msg.role === 'user' ? 'message-user' : 'message-assistant'}`}
//           >
//             {/* Avatar ao lado da mensagem */}
//             <div className="message-avatar">
//               <img
//                 src={msg.role === 'user' ? userAvatar : botAvatar}
//                 alt={msg.role === 'user' ? 'Você' : 'Bot'}
//               />
//             </div>

//             <div className="message-bubble">
//               <ReactMarkdown className="markdown-content" remarkPlugins={[remarkGfm]}>
//                 {msg.text}
//               </ReactMarkdown>
//             </div>
//           </div>
//         ))}
//         {/* "Marcador" para rolar ao final */}
//         <div ref={messagesEndRef} />
//       </div>

//       {/* CAMPO DE TEXTO + BOTÃO SEND */}
//       <div className="chat-input-container">
//         <textarea
//           className="chat-input"
//           rows={2}
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
