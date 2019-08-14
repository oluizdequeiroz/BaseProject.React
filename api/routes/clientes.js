const express = require('express');
const router = express.Router();
const models = require('../models/index');
const verifyToken = require('../utils/token').verifyToken;

/**
 * @swagger
 * /cliente:
 *   get:
 *     description: Retorna todos os clientes
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: objeto com uma lista de clientes
 */
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

/**
 * @swagger
 * /cliente/refeicoes/{codigoCliente}/{dataInicial}/{dataFinal}:
 *   get:
 *     description: Retorna cliente com lista de dias com suas respectivas refeições.
 *     parameters:
 *       - name: codigoCliente
 *         in: path
 *         required: true
 *         type: integer
 *       - name: dataInicial
 *         in: path
 *         required: true
 *         type: string
 *       - name: dataFinal
 *         in: path
 *         required: true
 *         type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: objeto com um cliente e seus dados referentes a refeições.
 */
router.get('/refeicoes/:codigoCliente/:dataInicial/:dataFinal', verifyToken, (req, res, next) => {
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
        "Erro na consulta das refeições do cliente."
      ]
    }));
});

/**
 * @swagger
 * /cliente/mapaproducao/{dataInicial}/{dataFinal}:
 *   get:
 *     description: Retorna o mapa de produção das refeições.
 *     parameters:
 *       - name: dataInicial
 *         in: path
 *         required: true
 *         type: string
 *       - name: dataFinal
 *         in: path
 *         required: true
 *         type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: objeto com clientes e seus dados referentes a refeições.
 */
router.get('/mapaproducao/:dataInicial/:dataFinal', (req, res, next) => {
  const { dataInicial, dataFinal } = req.params;

  models.cliente.findAll({
    include: [{
      model: models.refeicao,
      as: 'dias',
      include: [{
        model: models.itemrefeicao,
        as: 'itemrefeicoes',
        include: [{
          model: models.receita,
          as: 'receita',
          include: [{
            model: models.itemreceita,
            as: 'itemreceitas',
            include: [{
              model: models.produto,
              as: 'produto'
            }]
          }]
        }]
      }]
    }],
    where: {
      [models.Sequelize.Op.and]: [
        models.Sequelize.literal(`dias.refdatarefeicao between '${dataInicial}' and '${dataFinal}'`)
      ]
    }
  })
    .then(clientes => {
      const _clientes = clientes && clientes.map(cliente => ({
        ...cliente.dataValues, dias: cliente.dias.groupBy('datarefeicao', 'refeicoes')
      }));

      res.json({
        sucesso: true,
        retorno: _clientes
      });
    })
    .then(error => res.json({
      stack: error,
      erros: [
        "Erro na consulta das refeições do cliente."
      ]
    }));
});

module.exports = router;