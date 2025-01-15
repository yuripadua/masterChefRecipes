// backend/src/index.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Exemplo de conexão com MongoDB Atlas
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/chatbot-receitas';
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB conectado!'))
  .catch((err) => console.error('Erro de conexão com MongoDB:', err));

// Exemplo de rota simples
app.get('/', (req, res) => {
  res.send('API do Chatbot de Receitas está rodando!');
});

// Porta
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
