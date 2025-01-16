// // frontend/src/components/Layout.js
// import React, { useState } from 'react';
// import Sidebar from './Sidebar';
// import ChatBot from './ChatBot';

// import './Layout.css'; // CSS específico do layout

// function Layout() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div className="layout-container">
//       {/* Botão de menu hamburguer - visível em telas menores */}
//       <button className="hamburger-btn" onClick={toggleSidebar}>
//         &#9776; {/* caractere hamburguer */}
//       </button>

//       {/* Sidebar */}
//       <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

//       {/* Main Content (Chat) */}
//       <div className="main-content">
//         <ChatBot />
//       </div>
//     </div>
//   );
// }

// export default Layout;
