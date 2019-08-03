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

router.get('/', (req, res, next) => {
  models.usuario.findAll({})
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
  models.usuario.findAll({
    where: {
      nome: req.params.username
    }
  })
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
