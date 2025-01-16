// backend/src/routes/chatAnonRoutes.js
const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// POST /chat-anon
router.post('/', async (req, res) => {
  try {
    const { fullConversation } = req.body; 
    // fullConversation é um array: [ {role: 'assistant', text: '...'}, ...]

    // Converter para o formato que a Gemini entende
    // Precisamos de algo como: { role: 'user'|'model'|'assistant'|'developer', parts: [{ text: '...' }] }
    // Observação: Gemini renomeou 'assistant' para 'model' internamente, mas podemos manter esse mapeamento.

    const geminiHistory = fullConversation.map((msg) => {
      // Ajustar a role 'assistant' -> 'model'
      let role = msg.role;
      if (role === 'assistant') role = 'user';
      // se tiver 'user' mantém. 
      // se quiser permitir 'system' -> 'developer', etc.

      return {
        role,
        parts: [{ text: msg.text }]
      };
    });

    // Inicia o chat
    const chat = model.startChat({
      history: geminiHistory,
    });

    // A última mensagem do array deve ser do usuário (role=user).
    // Podemos chamar sendMessage com o texto do último item. 
    const lastUserMessage = fullConversation[fullConversation.length - 1];
    const result = await chat.sendMessage(lastUserMessage.text);

    const answer = result.response.text() || '';

    return res.json({ answer });
  } catch (error) {
    console.error('Erro no chat anônimo:', error);
    return res.status(500).json({ error: 'Erro no chat anônimo' });
  }
});

module.exports = router;
