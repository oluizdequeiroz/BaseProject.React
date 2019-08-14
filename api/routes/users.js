const express = require('express');
const router = express.Router();
const models = require('../models/index');
const jwt = require('../utils/token').jwt;

/**
 * @swagger
 * /usuario/login:
 *   post:
 *     description: Realiza login de usuário, gerando token
 *     parameters:
 *       - name: dados
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - usuario
 *             - senha
 *           properties:
 *             usuario:
 *               type: string
 *             senha:
 *               type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: objeto com um token de sessão
 */
router.post('/login', (req, res, next) => {
  const { usuario, senha } = req.body;

  models.usuario.findAll({
    where: {
      nome: usuario,
      senha
    }
  })
    .then(([user]) => {
      if (user) {
        jwt.sign({ user }, '$alimenta$', (err, token) => {
          res.json({
            sucesso: true,
            retorno: token
          });
        });
      } else res.json({
        stack: "Acesso não autorizado.",
        erros: [
          "Usuário não encontrado."
        ]
      });
    })
    .catch(error => res.json({
      stack: error,
      erros: [
        "Acesso não autorizado."
      ]
    }));
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
