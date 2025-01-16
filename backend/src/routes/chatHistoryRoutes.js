// // routes/chatHistoryRoutes.js
// const express = require('express');
// const router = express.Router();
// const Chat = require('../models/Chat');
// const auth = require('../middlewares/authMiddleware');

// // Criar novo chat
// router.post('/create', auth, async (req, res) => {
//   try {
//     const chat = new Chat({
//       user: req.userId,
//       title: req.body.title || 'Nova Conversa',
//       messages: [{ role: 'assistant', text: 'Olá! Sou o seu assistente de receitas. O que vamos cozinhar hoje?!' }]
//     });
//     await chat.save();
//     return res.json(chat);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Erro ao criar chat.' });
//   }
// });

// // Listar chats do usuário
// router.get('/', auth, async (req, res) => {
//   try {
//     const chats = await Chat.find({ user: req.userId })
//       .sort({ createdAt: -1 });
//     return res.json(chats);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Erro ao buscar chats.' });
//   }
// });

// // Obter chat específico
// router.get('/:chatId', auth, async (req, res) => {
//   try {
//     const chat = await Chat.findOne({ 
//       _id: req.params.chatId,
//       user: req.userId 
//     });
//     if (!chat) {
//       return res.status(404).json({ error: 'Chat não encontrado.' });
//     }
//     return res.json(chat);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Erro ao buscar chat.' });
//   }
// });


// const personlSystemInstruction = `Você é um assistente de receitas. Responda como se fosse um 
//                                 chef experiente e amigável.Se houver perguntas que não estejam 
//                                 relacionadas a receitas, ingredientes e assuntos correlacionados, 
//                                 responda que você é um chatbot para receitas e não possui informações 
//                                 sobre questões não relacionadas a receitas, não importa o quanto
//                                 perguntem ou argumentem ou insistam.`;



// // Enviar mensagem ao chat (e chamar Gemini)
// const { GoogleGenerativeAI } = require('@google/generative-ai');
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ 
//     model: 'gemini-1.5-flash',
//     systemInstruction: personlSystemInstruction, 
// });


  




// router.post('/:chatId/message', auth, async (req, res) => {
//   try {
//     const { text } = req.body;
//     const chatId = req.params.chatId;

//     // Busca o chat no BD
//     const chat = await Chat.findOne({ _id: chatId, user: req.userId });
//     if (!chat) {
//       return res.status(404).json({ error: 'Chat não encontrado.' });
//     }

//     // Adiciona a mensagem do usuário no array
//     chat.messages.push({ role: 'user', text });
//     await chat.save();

//     // Monta o array de conteúdo para mandar ao Gemini
//     // (Pode usar chat.messages, convertendo roles 'assistant' para 'model' se precisar)
//     // Exemplo simples:
//     const geminiInput = chat.messages.map(m => {
//       return { role: m.role === 'assistant' ? 'user' : m.role, parts: [ { text: m.text } ] };
//     });

//     // Usa chat approach ou generateContent
//     const conversation = model.startChat({ history: geminiInput });

//     // Mensagem do usuário já está no array, então a "mensagem" atual é a última.
//     // Se preferir, poderia usar sendMessage(...) e não pushar antes.
//     const result = await conversation.sendMessage(text);

//     const answer = result.response.text() || '';

//     // Salva a resposta no BD
//     chat.messages.push({ role: 'assistant', text: answer });
//     await chat.save();

//     return res.json({ answer });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Erro ao processar mensagem.' });
//   }
// });




// router.put('/:chatId/rename', auth, async (req, res) => {
//     try {
//       const { newTitle } = req.body;
//       const chat = await Chat.findOneAndUpdate(
//         { _id: req.params.chatId, user: req.userId },
//         { title: newTitle },
//         { new: true } // retorna o doc atualizado
//       );
//       if (!chat) {
//         return res.status(404).json({ error: 'Chat não encontrado.' });
//       }
//       return res.json(chat);
//     } catch (err) {
//       console.error(err);
//       return res.status(500).json({ error: 'Erro ao renomear chat.' });
//     }
//   });

// module.exports = router;



// routes/chatHistoryRoutes.js
const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');
const auth = require('../middlewares/authMiddleware');

// Define the system instruction for the assistant
const personalSystemInstruction = `You are a recipe assistant. Respond as if you were a friendly and experienced chef. 
If there are questions unrelated to recipes, ingredients, or similar topics, explain that you are a recipe chatbot 
and cannot provide information on unrelated matters, no matter how much someone insists or argues.`;

// Initialize Google Generative AI
const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  systemInstruction: personalSystemInstruction,
});

// Create a new chat
router.post('/create', auth, async (req, res) => {
  try {
    const chat = new Chat({
      user: req.userId,
      title: req.body.title || 'New Conversation',
      messages: [
        { role: 'assistant', text: 'Hello! I am your recipe assistant. What shall we cook today?' },
      ],
    });
    await chat.save();
    return res.json(chat);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error creating chat.' });
  }
});

// List all chats for the user
router.get('/', auth, async (req, res) => {
  try {
    const chats = await Chat.find({ user: req.userId }).sort({ createdAt: -1 });
    return res.json(chats);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error fetching chats.' });
  }
});

// Get a specific chat by ID
router.get('/:chatId', auth, async (req, res) => {
  try {
    const chat = await Chat.findOne({ _id: req.params.chatId, user: req.userId });
    if (!chat) {
      return res.status(404).json({ error: 'Chat not found.' });
    }
    return res.json(chat);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error fetching chat.' });
  }
});

// Send a message to the chat (and call Gemini)
router.post('/:chatId/message', auth, async (req, res) => {
  try {
    const { text } = req.body;
    const chatId = req.params.chatId;

    // Find the chat in the database
    const chat = await Chat.findOne({ _id: chatId, user: req.userId });
    if (!chat) {
      return res.status(404).json({ error: 'Chat not found.' });
    }

    // Add the user's message to the chat history
    chat.messages.push({ role: 'user', text });
    await chat.save();

    // Prepare the conversation history for Gemini
    const geminiInput = chat.messages.map((m) => ({
      role: m.role === 'assistant' ? 'user' : m.role,
      parts: [{ text: m.text }],
    }));

    // Start the conversation with Gemini
    const conversation = model.startChat({ history: geminiInput });

    // Send the user's message to Gemini and get the response
    const result = await conversation.sendMessage(text);
    const answer = result.response.text() || '';

    // Add the assistant's response to the chat history
    chat.messages.push({ role: 'assistant', text: answer });
    await chat.save();

    return res.json({ answer });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error processing message.' });
  }
});

// Rename a chat
router.put('/:chatId/rename', auth, async (req, res) => {
  try {
    const { newTitle } = req.body;
    const chat = await Chat.findOneAndUpdate(
      { _id: req.params.chatId, user: req.userId },
      { title: newTitle },
      { new: true } // Return the updated document
    );
    if (!chat) {
      return res.status(404).json({ error: 'Chat not found.' });
    }
    return res.json(chat);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Error renaming chat.' });
  }
});

module.exports = router;
