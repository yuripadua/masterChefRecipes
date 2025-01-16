
// backend/src/routes/chatAnonRoutes.js
const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Google Generative AI with the API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// POST /chat-anon - Handles anonymous chat requests
router.post('/', async (req, res) => {
  try {
    const { fullConversation } = req.body;
    // fullConversation is expected to be an array: [ { role: 'assistant', text: '...' }, ... ]

    // Convert the conversation into a format that Gemini understands
    // Gemini requires: { role: 'user' | 'model' | 'assistant' | 'developer', parts: [{ text: '...' }] }
    // Note: Internally, Gemini renamed 'assistant' to 'model', so we handle this mapping.

    const geminiHistory = fullConversation.map((msg) => {
      // Adjust the role: map 'assistant' to 'user'
      let role = msg.role;
      if (role === 'assistant') role = 'user';
      // Keep 'user' as is. Map other roles (e.g., 'system') as needed, such as 'developer'.

      return {
        role,
        parts: [{ text: msg.text }],
      };
    });

    // Start the chat with the conversation history
    const chat = model.startChat({
      history: geminiHistory,
    });

    // The last message in the array should come from the user (role = 'user').
    // Send the text of the last message using `sendMessage`.
    const lastUserMessage = fullConversation[fullConversation.length - 1];
    const result = await chat.sendMessage(lastUserMessage.text);

    // Extract the AI's response
    const answer = result.response.text() || '';

    // Send the response back to the client
    return res.json({ answer });
  } catch (error) {
    console.error('Error in anonymous chat:', error);
    return res.status(500).json({ error: 'Error in anonymous chat' });
  }
});

module.exports = router;
