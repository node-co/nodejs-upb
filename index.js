const express = require('express');
const server = express();
const bodyParser = require('body-parser');

let frases = [
  'el que mucho abarca poco aprieta',
  'a camarón regalado se lo lleva la corriente'
];

server.use(bodyParser.json()); // for parsing application/json
server.use(bodyParser.urlencoded({ extended: true }));
server.get('/', express.static('public'));

server.get('/frases', function(req, res) {
  res.json(frases);
});

server.get('/frases/:index', function(req, res) {
  const index = parseInt(req.params.index);
  if (typeof frases[index] !== 'undefined') {
    return res.json({ frase: frases[index] });
  }
  res.status(404).json({ error: `el indice ${req.params.index} no existe` });
});

server.post('/frases', function(req, res) {
  frases.push(req.body.frase);
  res.json(req.body);
});

server.put('/frases/:index', function(req, res) {
  const index = parseInt(req.params.index);
  if (typeof frases[index] !== 'undefined') {
    frases[index] = req.body.frase;
    return res.json(frases[index]);
  }
  res.status(404).json({ error: `el indice ${req.params.index} no existe` });
});

server.delete('/frases/:index', function(req, res) {
  const index = parseInt(req.params.index);
  if (typeof frases[index] !== 'undefined') {
    frases.splice(index, 1);
    return res.status(200).end();
  }
  res.status(404).json({ error: `el indice ${req.params.index} no existe` });
});

server.listen(3000);
