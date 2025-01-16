// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// // const recipeRoutes = require('./routes/recipeRoutes');
// const chatAnonRoutes = require('./routes/chatAnonRoutes');
// const authRoutes = require('./routes/authRoutes');
// const chatHistoryRoutes = require('./routes/chatHistoryRoutes'); 



// const app = express();
// app.use(cors());
// app.use(express.json());
// // app.use('/recipes', recipeRoutes);




// // Exemplo de conexão com MongoDB Atlas
// const MONGODB_URI = process.env.MONGODB_URI;
// mongoose
//   .connect(MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(() => console.log('MongoDB conectado!'))
//   .catch((err) => console.error('Erro de conexão com MongoDB:', err));




// // Exemplo de rota simples
// app.get('/', (req, res) => {
//   res.send('API do Chatbot de Receitas está rodando!');
// });



// // Rotas públicas
// app.use('/auth', authRoutes);

// // Rotas de chat que requerem login
// app.use('/chats', chatHistoryRoutes);

// //Rotas de chat anonimas
// app.use('/chat-anon', chatAnonRoutes);

// // Porta
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Servidor rodando na porta ${PORT}`);
// });



require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// const recipeRoutes = require('./routes/recipeRoutes');
const chatAnonRoutes = require('./routes/chatAnonRoutes');
const authRoutes = require('./routes/authRoutes');
const chatHistoryRoutes = require('./routes/chatHistoryRoutes'); 

const app = express();
app.use(cors());
app.use(express.json());
// app.use('/recipes', recipeRoutes);

// Example of MongoDB Atlas connection
const MONGODB_URI = process.env.MONGODB_URI;
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected!'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Simple example route
app.get('/', (req, res) => {
  res.send('Recipe Chatbot API is running!');
});

// Public routes
app.use('/auth', authRoutes);

// Chat routes that require login
app.use('/chats', chatHistoryRoutes);

// Anonymous chat routes
app.use('/chat-anon', chatAnonRoutes);

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
