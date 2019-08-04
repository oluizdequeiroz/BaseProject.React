var express = require('express');
var router = express.Router();
var models = require('../models/index');

router.get('/:receitaId', (req, res, next) => {
    models.sequelize.query(`SELECT itrnumsequencial codigo, itrquantidadeliquida quantidadeliquida, itrpercentualperda percentualperda, produto.pronumsequencial codigoProduto, produto.pronome produto, itrreceita receita FROM tbitemreceita itemreceita inner join tbproduto produto on itemreceita.itrproduto = produto.pronumsequencial WHERE itemreceita.itrreceita = ${req.params.receitaId}`,
        { type: models.sequelize.QueryTypes.SELECT }
    )
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