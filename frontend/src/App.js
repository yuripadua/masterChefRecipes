// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;




// Daqui para baixo foi um teste com o "back fake, só para testar mesmo"

// import React, { useEffect, useState } from 'react';
// import api from './services/api';

// function App() {
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     api.get('/')
//       .then((res) => {
//         setMessage(res.data);
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>Chatbot de Receitas</h1>
//       <p>Resposta do servidor: {message}</p>
//     </div>
//   );
// }


// export default App;



// import React from 'react';
// import ChatBot from './components/ChatBot';

// function App() {
//   return (
//     <div>
//       <h1>Chatbot de Receitas</h1>
//       <ChatBot />
//     </div>
//   );
// }

// export default App;


// // frontend/src/App.js
// import React from 'react';
// import Layout from './components/Layout';

// function App() {
//   return <Layout />;
// }

// export default App;


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
