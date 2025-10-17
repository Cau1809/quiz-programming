const express = require('express');
const router = express.Router();
const db = require('../db');

// Rota para pegar todas as perguntas
router.get('/questions', (req, res) => {
  db.query('SELECT id, question_text, option_a, option_b, option_c, option_d, correct_option, explanation FROM questions', (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results);
  });
});

// Rota para enviar resultado do quiz
router.post('/submit', (req, res) => {
  const { user_id, score } = req.body;

  if (!user_id || score === undefined) {
    return res.status(400).json({ message: "Dados incompletos" });
  }

  db.query('INSERT INTO results (user_id, score) VALUES (?, ?)', [user_id, score], (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: "Resultado salvo com sucesso!" });
  });
});

module.exports = router;
