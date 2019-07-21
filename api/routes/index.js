var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

const endpoint = '/usuario/login';
router.post(endpoint, (req, res, next) => {

  try {
    fetch(`http://alimentasolucoes.herokuapp.com/restApi${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    })
      .then(response => {
        console.info(response);
        return response.json();
      })
      .then(json => {
        console.info(json);
        res.json(json);
      })
      .catch(error => {
        console.error(error);
        res.json(error);
      });
  } catch (error) {
    console.error(error);
    res.json(error);0
  }
});

module.exports = router;
