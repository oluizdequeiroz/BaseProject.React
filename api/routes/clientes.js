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
      [models.Sequelize.Op.and]: [
        {
          numsequencial: req.params.codigoCliente,
        },
        models.Sequelize.literal(`dias.refdatarefeicao between '${req.params.dataInicial}' and '${req.params.dataFinal}'`)
      ]
    }
  })
    .then(clientes => {
      const cliente = clientes.length ? {
        ...clientes[0].dataValues,
        dias: clientes[0].dias.groupBy('datarefeicao', 'refeicoes')
      } : { dias: [] };

      let diasVazios = [];
      const dataInicial = new Date(req.params.dataInicial);
      const dataFinal = new Date(req.params.dataFinal);
      let qtdDias = dataFinal.subtract(dataInicial);
      qtdDias = qtdDias < 7 ? 7 : qtdDias;
      const numDiasVazios = qtdDias - cliente.dias.length;
      for (var i = 1; i <= numDiasVazios; i++) {
        const date = numDiasVazios === qtdDias ? dataInicial : new Date(cliente.dias[cliente.dias.length - 1].datarefeicao);
        date.setDate(dataInicial.getDate() + i + 1);

        diasVazios.push({
          datarefeicao: `${date.toISOString().substring(0, 10)}`
        });
      }

      if (cliente.dias) cliente.dias.push(...diasVazios);
      else cliente.dias = diasVazios;

      res.json({
        sucesso: true,
        retorno: cliente
      });
    })
    .then(error => res.json({
      stack: error,
      erros: [
        "Erro na consulta do cliente."
      ]
    }));
});

module.exports = router;