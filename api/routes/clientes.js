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
  const { codigoCliente, dataInicial, dataFinal } = req.params;

  models.cliente.findAll({
    include: [{
      model: models.refeicao,
      as: 'dias'
    }],
    where: {
      [models.Sequelize.Op.and]: [
        {
          numsequencial: codigoCliente,
        },
        models.Sequelize.literal(`dias.refdatarefeicao between '${dataInicial}' and '${dataFinal}'`)
      ]
    }
  })
    .then(clientes => {
      const cliente = clientes.length ? {
        ...clientes[0].dataValues,
        dias: clientes[0].dias.groupBy('datarefeicao', 'refeicoes')
      } : { dias: [] };

      let todosDias = [];
      const dataInicialDate = new Date(dataInicial);
      const dataFinalDate = new Date(dataFinal);
      let qtdDias = dataFinalDate.subtract(dataInicialDate);
      qtdDias = qtdDias < 7 ? 7 : qtdDias;

      for (var i = 0; i < qtdDias; i++) {
        const date = new Date(dataInicialDate);
        date.setDate(dataInicialDate.getDate() + i);

        todosDias.push({
          datarefeicao: `${date.toISOString().substring(0, 10)}`
        });
      }

      cliente.dias.forEach(dia => {
        todosDias = todosDias.map(diaVazio => {
          if (diaVazio.datarefeicao === dia.datarefeicao) {
            return {
              datarefeicao: dia.datarefeicao,
              refeicoes: dia.refeicoes
            };
          } else {
            return diaVazio;
          }
        });        
      });

      cliente.dias = todosDias;

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