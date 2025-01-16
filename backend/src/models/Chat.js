
// models/Chat.js
const mongoose = require('mongoose');

// Define the schema for individual messages within a chat
const messageSchema = new mongoose.Schema({
  role: { 
    type: String, 
    enum: ['user', 'assistant', 'model', 'system'], // Allowed roles for a message
  },
  text: String, // The content of the message
});

// Define the schema for the chat document
const chatSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', // References the User model
    required: true, // Ensures that a chat must be associated with a user
  },
  title: String, // Optional title for the chat
  messages: [messageSchema], // Array of messages within the chat
  createdAt: { 
    type: Date, 
    default: Date.now, // Automatically sets the creation date
  },
});

// Export the Chat model based on the chat schema
module.exports = mongoose.model('Chat', chatSchema);
