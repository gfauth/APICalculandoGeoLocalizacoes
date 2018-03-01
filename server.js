/**
 * Arquivo: server.js
 * Author: Luan Fauth
 * Description: Arquivo principal e responsável por executar a aplicação.
 * Data: 27/02/2018
 */

//#region Declaração das variaveis do server
var express = require("express");
var bodyParser = require("body-parser");
var geolib = require("geolib");
var porta = 8080;
//#endregion

//#region Propriedades de retorno.
var sucesso = {
    status: {
        codigo: 200,
        mensagem: "sucesso"
    },
    resultado: []
};

var falha = {
    status: {
        codigo: 550,
        mensagem: "erro"
    }
}
//#endregion

//#region Inicialização do servidor e declaração de midlewares
var app = express();
app.use(bodyParser.json());
//#endregion

//#region funções de GET
app.get("/", function (req, res) {
    res.send("Utilize o método POST contendo um objeto Json.");
});

//#endregion

//#region Funções de POST
app.post("/", function (req, res) {
    var retorno;
    var resultado = [];
    try {
        req.body.destinos.forEach(element => {
            var distancia = geolib.getDistance(
                {
                    latitude: req.body.pontoOrigem.lat,
                    longitude: req.body.pontoOrigem.lon
                },
                {
                    latitude: element.lat,
                    longitude: element.lon
                });

            resultado.push(
                {
                    distancia: distancia,
                    coordenadas: element
                });
        });

        resultado = resultado.sort(ordenar);
        sucesso.resultado = resultado;
        retorno = sucesso;
    }
    catch (ex) {
        retorno = falha;
        retorno.erro = ex.message;
    }

    res.send(retorno);
});

//#endregion

//Inicialização da escuta do server.
app.listen(porta, function () {
    console.log("Servidor está rodando na porta " + porta + ".");
});

//Função de ordenação usada no sort para obter maior desempenho na reordenação do array.
function ordenar(a, b) {
    return (a.distancia - b.distancia);
};