var express = require('express');
var router = express.Router();
var models = require('../models/index');

router.put('/:clienteId/:datarefeicao/:refeicaoId?', (req, res, next) => {
    const { clienteId, datarefeicao, refeicaoId } = req.params;

    if (refeicaoId) {
        models.refeicao.update({ ...req.body, cliente: clienteId, datarefeicao }, {
            where: {
                numsequencial: refeicaoId
            }
        })
            .then(() => res.json({
                sucesso: true
            }))
            .then(error => res.json({
                stack: error,
                erros: [
                    "Erro ao tentar salvar refeição"
                ]
            }));
    } else {
        models.receita.create({ ...req.body, cliente: clienteId, datarefeicao })
            .then(() => res.json({
                sucesso: true
            }))
            .then(error => res.json({
                stack: error,
                erros: [
                    "Erro ao tentar salvar refeição"
                ]
            }));
    }
});

module.exports = router;