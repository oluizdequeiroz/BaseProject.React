var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/usuario/login', (req, res, next) => {

  res.json({
    sucesso: true,
    retorno: "eyJ0b2siOiIwOTI5ZjNiYS1mYmRmLTQ4MDEtODIwNS1iOWRjMDFiOTBiYjAiLCJ1c3UiOjksInNpbiI6InRmbWl5dmEyWFZnWHZGMlVGQVVRWDhQUHlwOTFXZlJaZTJNdkZWOUlaM29uUkxPU2F2QUhQS1JsaUU0UDdxcWZQSFZvN1RmN1VwMW1pR1B2S0ZLY2lRIn0",
    mensagens: [
      "Login efetuado com sucesso."
    ],
    erros: null
  });
});

module.exports = router;
