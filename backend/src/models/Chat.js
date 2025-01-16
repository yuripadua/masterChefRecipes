// models/Chat.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  role: { type: String, enum: ['user', 'assistant', 'model', 'system'] },
  text: String,
});

const chatSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: String,
  messages: [messageSchema],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Chat', chatSchema);
