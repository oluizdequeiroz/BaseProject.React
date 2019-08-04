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

router.post('/salvar', (req, res, next) => {
  if (req.body.codigo) {
    models.receita.update({ ...req.body, codigo: undefined }, {
      where: {
        codigo: req.body.codigo
      }
    })
      .then(() => res.json({
        sucesso: true
      }))
      .then(error => res.json({
        stack: error,
        erros: [
          "Erro ao tentar salvar receita"
        ]
      }));
  } else {
    models.receita.create(req.body)
      .then(() => res.json({
        sucesso: true
      }))
      .then(error => res.json({
        stack: error,
        erros: [
          "Erro ao tentar salvar receita"
        ]
      }));
  }
});

router.delete('/excluir/:codigo', (req, res, next) => {
  models.receita.destroy({
    where: {
      codigo: req.params.codigo
    }
  })
    .then(() => res.json({
      sucesso: true
    }))
    .then(error => res.json({
      stack: error,
      erros: [
        "Erro ao tentar excluir receita"
      ]
    }));
});

module.exports = router;