var express = require('express');
var router = express.Router();
var models = require('../models/index');

router.get('/', (req, res, next) => {
  models.cliente.findAll({})
    .then(clientes => res.json({
      sucesso: true,
      retorno: clientes
    }))
    .catch(error => res.json({
      stack: error,
      erros: [
        "Erro na consulta de clientes!"
      ]
    }))
});

router.get('/refeicoes/:codigoCliente', (req, res, next) => {
  models.cliente.findAll({
    include: [{
      model: models.refeicao,
      as: 'dias',
      include: [{
        model: models.itemrefeicao,
        as: 'refeicoes',
        include: {
          model: models.receita,
          as: 'receita'
        }
      }]
    }],
    where: {
      numsequencial: req.params.codigoCliente
    }
  })
    .then(clientes => res.json({
      sucesso: true,
      retorno: clientes[0]
    }))
    .then(error => res.json({
      stack: error,
      erros: [
        "Erro na consulta do cliente."
      ]
    }));
});

module.exports = router;