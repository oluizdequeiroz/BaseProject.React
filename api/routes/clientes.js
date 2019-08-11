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

router.get('/refeicoes/:codigoCliente/:dataInicial/:dataFinal', (req, res, next) => {
  models.cliente.findAll({
    include: [{
      model: models.refeicao,
      as: 'dias'
    }],
    where: {
      numsequencial: req.params.codigoCliente,
      datarefeicao: {
        '$Between': [req.params.dataInicial, req.params.dataFinal]
      }
    }
  })
    .then(clientes =>
      res.json({
        sucesso: true,
        retorno: {
          ...clientes[0].dataValues,
          dias: clientes[0].dias.groupBy('datarefeicao', 'refeicoes')
        }
      }))
    .then(error => res.json({
      stack: error,
      erros: [
        "Erro na consulta do cliente."
      ]
    }));
});

module.exports = router;