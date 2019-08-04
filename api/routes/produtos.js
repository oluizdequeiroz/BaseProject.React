var express = require('express');
var router = express.Router();
var models = require('../models/index');

router.get('/', (req, res, next) => {
    models.produto.findAll({})
        .then(produtos => res.json({
            sucesso: true,
            retorno: produtos
        }))
        .catch(error => res.json({
            stack: error,
            erros: [
                "Erro na consulta de produtos!"
            ]
        }))
});

router.get('/:codigo', (req, res, next) => {
    models.produto.findAll({
        where: {
            codigo: req.params.codigo
        }
    })
        .then(produtos => res.json({
            sucesso: true,
            retorno: produtos
        }))
        .catch(error => res.json({
            stack: error,
            erros: [
                "Erro na consulta de produto por código!"
            ]
        }))
});

router.get('/pornome/:nome', (req, res, next) => {
    models.sequelize.query(`SELECT pronumsequencial codigo, pronome nome, prounidademedida unidademedida FROM tbproduto produto WHERE produto.pronome like '%${req.params.nome}%'`, {
        type: models.sequelize.QueryTypes.SELECT
    })
        .then(produtos => res.json({
            sucesso: true,
            retorno: produtos
        }))
        .catch(error => {
            res.json({
                stack: error,
                erros: [
                    "Erro na consulta de produtos por nome!"
                ]
            });
        })
});

module.exports = router;