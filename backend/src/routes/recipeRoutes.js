// const express = require('express');
// const router = express.Router();
// const Recipe = require('../models/Recipe');

// // [GET] Lista de receitas
// router.get('/', async (req, res) => {
//   try {
//     const recipes = await Recipe.find({});
//     res.json(recipes);
//   } catch (error) {
//     res.status(500).json({ error: 'Erro ao buscar receitas' });
//   }
// });

// // [GET] Detalhes de uma receita específica
// router.get('/:id', async (req, res) => {
//   try {
//     const recipe = await Recipe.findById(req.params.id);
//     res.json(recipe);
//   } catch (error) {
//     res.status(500).json({ error: 'Erro ao buscar receita' });
//   }
// });

// module.exports = router;
