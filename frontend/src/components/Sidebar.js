// // frontend/src/components/Sidebar.js
// import React from 'react';
// import './Sidebar.css';

// function Sidebar({ isOpen, toggleSidebar }) {
//   // Mock de itens de histórico
//   const mockHistories = [
//     'Histórico 1',
//     'Histórico 2',
//     'Histórico 3',
//     'Histórico 4'
//   ];

//   return (
//     <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
//       <div className="sidebar-header">
//         <h2>Históricos</h2>
//         {/* Botão para fechar em mobile */}
//         <button className="close-btn" onClick={toggleSidebar}>
//           &times;
//         </button>
//       </div>
//       <div className="sidebar-content">
//         {mockHistories.map((hist, idx) => (
//           <div key={idx} className="history-item">
//             {hist}
//           </div>
//         ))}
//       </div>
//     </aside>
//   );
// }

// export default Sidebar;
