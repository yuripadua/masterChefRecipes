const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Rota de Cadastro
router.post('/register', async (req, res) => {
  try {
    const { email, password, passwordConfirm } = req.body;
    if (password !== passwordConfirm) {
      return res.status(400).json({ error: 'As senhas não coincidem.' });
    }

    // Verificar se email já existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'E-mail já cadastrado.' });
    }

    // Gerar hash da senha
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Salvar usuário
    const newUser = new User({
      email,
      passwordHash
    });
    await newUser.save();

    return res.json({ message: 'Cadastro realizado com sucesso!' });
  } catch (error) {
    console.error('Erro no register:', error);
    return res.status(500).json({ error: 'Erro no servidor.' });
  }
});

// Rota de Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Procurar usuário pelo email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Credenciais inválidas.' });
    }

    // Comparar senha
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return res.status(400).json({ error: 'Credenciais inválidas.' });
    }

    // Se estiver tudo OK, gerar um token (JWT)
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '2h' // expira em 2 horas, por ex
    });

    return res.json({ message: 'Login bem-sucedido!', token });
  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).json({ error: 'Erro no servidor.' });
  }
});

module.exports = router;
