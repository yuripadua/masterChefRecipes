// const express = require('express');
// const router = express.Router();
// const { Configuration, OpenAIApi } = require('openai');

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY
// });
// const openai = new OpenAIApi(configuration);

// router.post('/', async (req, res) => {
//   const { userMessage } = req.body;

//   try {
//     // Exemplo usando "text-davinci-003" ou "gpt-3.5-turbo"
//     const response = await openai.createChatCompletion({
//       model: 'gpt-4o-mini', 
//       messages: [
//         { role: 'system', content: 'Você é um chatbot de receitas. Responda de forma direta e amigável.' },
//         { role: 'user', content: userMessage }
//       ]
//     });

//     const answer = response.data.choices[0].message.content;
//     res.json({ answer });
//   } catch (error) {
//     console.error('Erro no OpenAI:', error);
//     res.status(500).json({ error: 'Erro ao consultar IA' });
//   }
// });

// module.exports = router;






// CODIGO USANDO O CHATGPT..... estou sem creditos... terei que usaro GEMINI...
// backend/src/routes/chatRoutes.js
// const express = require('express');
// const OpenAI = require('openai').default;
// const router = express.Router();

// // const router = Router();


// // Inicializa a lib com a chave
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY, // pego do .env (sem aspas)
// });

// router.post('/', async (req, res) => {
//   const { userMessage } = req.body;
  
//   try {
//     // Observação: "gpt-4o", "gpt-4o-mini", etc. são modelos "novos" da doc
//     // Pode ser que você NÃO tenha acesso a eles. Se quiser algo garantido, use 'gpt-3.5-turbo'.
//     const response = await openai.chat.completions.create({
//       model: 'gpt-3.5-turbo', 
//       messages: [
//         {
//           role: 'developer', // no doc novo, substitui "system"
//           content: 'Você é um chatbot de receitas. Responda de forma direta e amigável.'
//         },
//         {
//           role: 'user',
//           content: userMessage
//         }
//       ],
//     });

//     // Obtém a resposta
//     const answer = response.choices[0].message?.content ?? '';
//     res.json({ answer });
//   } catch (error) {
//     console.error('Erro no OpenAI:', error);
//     res.status(500).json({ error: 'Erro ao consultar IA' });
//   }
// });

// // export default router;

// module.exports = router;













// codigo usando o GEMINI
// // backend/src/routes/chatRoutes.js
// const express = require('express');
// const router = express.Router();
// const { GoogleGenerativeAI } = require('@google/generative-ai');

// // Inicializa a lib com a chave do .env
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// // Seleciona o modelo. Você pode trocar 'gemini-1.5-flash' por outro.
// const model = genAI.getGenerativeModel({ 
//   model: 'gemini-1.5-flash',
//   // Caso queira adicionar "systemInstruction", por ex:
//   systemInstruction: 'Você é um chatbot de receitas. Responda de forma amigável. Se houver perguntas que não estejam relacionadas a receitas, ingredientes e assuntos correlacionados, responda que você é um chatbot para receitas e não possui informações sobre questões não relacionadas a receitas.'
  
// });

// router.post('/', async (req, res) => {
//   const { userMessage } = req.body;
  
//   try {
//     // Maneira simples (zero-shot).
//     // Aqui `userMessage` pode ser só string ou array de prompts multimídia.
//     const result = await model.generateContent(userMessage);

//     // A resposta é acessada via result.response.text()
//     const answer = result.response.text();

//     return res.json({ answer });
//   } catch (error) {
//     console.error('Erro no Gemini:', error);
//     return res.status(500).json({ error: 'Erro ao consultar Gemini' });
//   }
// });

// module.exports = router;
// backend/src/routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Carrega a env (se não estiver no index.js)
require('dotenv').config();

// Instancia a lib com a chave
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const personlSystemInstruction = `Você é um assistente de receitas. Responda como se fosse um 
                                chef experiente e amigável.Se houver perguntas que não estejam 
                                relacionadas a receitas, ingredientes e assuntos correlacionados, 
                                responda que você é um chatbot para receitas e não possui informações 
                                sobre questões não relacionadas a receitas.`;


// Escolhe o modelo. Pode alterar o 'gemini-1.5-flash' se tiver outro.
const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  // Podemos dar uma instrução de sistema aqui
  systemInstruction: personlSystemInstruction,
});

// Variável global para armazenar o “chat” (histórico + contexto):
let chat = null;

// Inicializa o chat na primeira vez:
function initChatIfNeeded() {
  if (!chat) {
    chat = model.startChat({
      // "history" define uma conversa inicial (opcional)
      history: [
        {
            role: "user",
            parts: [{ text: "Hello" }],
          },
        {
          role: 'model',
          parts: [{ text: 'Olá, estou aqui para te ajudar com receitas!' }],
        },
      ],
    });
  }
}




/**
 * [POST] /chat/message
 * Corpo da requisição: { userMessage: string }
 * Retorno: { answer: string, chatHistory: array }
 */
router.post('/message', async (req, res) => {
  try {
    initChatIfNeeded();

    const { userMessage } = req.body;

    // Envia a mensagem do usuário ao chat
    const result = await chat.sendMessage(userMessage);

    // Extrai a resposta do Gemini
    const answer = result.response.text();

    // Opcional: Você pode ler o chat.history para retornar todo o histórico
    // console.log(chat.history);

    // Manda de volta para o front
    return res.json({
      answer,
      // Se quiser devolver todo o histórico para renderizar no front:
      // chatHistory: chat.history,
    });
  } catch (error) {
    console.error('Erro ao consultar Gemini:', error);
    return res.status(500).json({ error: 'Erro ao consultar Gemini' });
  }
});

// Rota para resetar a conversa (opcional):
router.post('/reset', (req, res) => {
  chat = null;
  return res.json({ ok: true, message: 'Conversa resetada' });
});

module.exports = router;
