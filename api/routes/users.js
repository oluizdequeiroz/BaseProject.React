var express = require('express');
var router = express.Router();
var models = require('../models/index');
var fetch = require('isomorphic-fetch');

router.post('/login', (req, res, next) => {
  fetch('http://alimentasolucoes.herokuapp.com/restApi/usuario/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req.body)
  })
    .then(response => response.json())
    .then(json => res.json(json))
    .catch(error => res.json(error));
});

/* GET users listing. */
router.get('/', (req, res, next) => {
  models.tbusuario.findAll({})
    .then(users => res.json({
      sucesso: true,
      retorno: users
    }))
    .catch(error => res.json({
      stack: error,
      erros: [
        "Erro na consulta de usuários!"
      ]
    }))
});

router.get('/pornome/:username', (req, res, next) => {
  models.sequelize.query(`select * from tbusuario where usunome = '${req.params.username}'`,
    { type: models.sequelize.QueryTypes.SELECT }
  )
    .then(user => res.json({
      sucesso: true,
      retorno: user[0]
    }))
    .catch(error => res.json({
      stack: error,
      erros: [
        "Erro na cnsulta do usuário!"
      ]
    }))
});

module.exports = router;
