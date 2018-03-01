/**
 * Arquivo: server.js
 * Author: Luan Fauth
 * Description: Arquivo principal e responsável por executar a aplicação.
 * Data: 27/02/2018
 */

// Declaração das variaveis do server
var express = require("express");
var bodyParser = require("body-parser");
var geolocation = require('./app/api/geolocation');
var porta = 8080;

// Inicialização do servidor e declaração de midlewares
var app = express();
app.use(bodyParser.json());

// funções de GET
app.get("/", function (req, res) {
    res.send("Esta aplicação responde apenas chamadas via POST.");
});

// Funções de POST
app.post("/", function (req, res) {
    var retorno;
    retorno = geolocation(req.body);
    res.send(retorno);
});

// Inicialização da escuta do server.
app.listen(porta, function () {
    console.log("Servidor está rodando na porta " + porta + ".");
});