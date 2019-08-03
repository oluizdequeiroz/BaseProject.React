var express = require('express');
var router = express.Router();
var models = require('../models/index');

router.get('/', (req, res, next) => {
  models.receita.findAll({})
    .then(receitas => res.json({
      sucesso: true,
      retorno: receitas
    }))
    .catch(error => res.json({
      stack: error,
      erros: [
        "Erro na consulta de receitas!"
      ]
    }))
});

module.exports = router;