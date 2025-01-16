// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization; 
    if (!authHeader) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }

    // authHeader no formato "Bearer <token>"
    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
      return res.status(401).json({ error: 'Token inválido' });
    }

    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) {
      return res.status(401).json({ error: 'Token malformatado' });
    }

    // Verificar token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Token inválido ou expirado' });
      }
      req.userId = decoded.userId; // id do usuário
      return next();
    });
  } catch (error) {
    return res.status(401).json({ error: 'Falha na autenticação.' });
  }
};
