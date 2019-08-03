var express = require('express');
var router = express.Router();
var models = require('../models/index');

router.get('/:receitaId', (req, res, next) => {
  models.itemreceita.findAll({
      where: {
          receita: req.params.receitaId
      }
  })
    .then(itensReceitas => res.json({
      sucesso: true,
      retorno: itensReceitas
    }))
    .catch(error => res.json({
      stack: error,
      erros: [
        "Erro na consulta de itens de receitas!"
      ]
    }))
});

module.exports = router;