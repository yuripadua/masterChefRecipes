
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
