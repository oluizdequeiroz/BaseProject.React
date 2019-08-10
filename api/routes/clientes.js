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
  models.sequelize.query(`
    SELECT 
      cliente.clinome nomeCliente,
      dia.refdiarefeicao diaDaSemana,
      dia.refdatarefeicao dataRefeicao,
      dia.reftiporefeicao tipoRefeicao,
      receita.recnome nomeReceita
    FROM
      tbcliente cliente
        LEFT JOIN
      tbrefeicao dia ON cliente.clinumsequencial = dia.refcliente
        LEFT JOIN
      tbitemrefeicao refeicao ON dia.refnumsequencial = refeicao.irfrefeicao
        LEFT JOIN
      tbreceita receita ON refeicao.irfreceita = receita.recnumsequencial
    WHERE
      cliente.clinumsequencial = ${req.params.codigoCliente}
  `, {
      type: models.sequelize.QueryTypes.SELECT
    })
    .then(results => {
      const clientes = results.map(cliResult => ({
        nomeCliente: cliResult.nomeCliente,
        dias: results.filter(diaResult => diaResult.nomeCliente === cliResult.nomeCliente).map(diaResult => ({
          data: diaResult.dataRefeicao,
          refeicoes: results.filter(refResult => refResult.nomeReceita === diaResult.nomeReceita).map(refResult => ({
            nome: refResult.nomeReceita
          }))
        }))
      }));

      res.json({
        sucesso: true,
        retorno: clientes[0]
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