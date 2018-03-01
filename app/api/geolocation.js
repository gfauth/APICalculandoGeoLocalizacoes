/**
 * Arquivo: models/geolocation.js
 * Author: Luan Fauth
 * Description: Arquivo responsável pelo modelo dos dados 'geolocation' para realizar os calculos e funções
 * Data: 01/03/2018
 */

var geolib = require("geolib");

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

//#region Function responsável por receber os dados da entrada da API e realizar o calculo de distância além de reordenar a lista de destinos do resultado.
var geolocation = function (dados) {
    var retorno = validarDados(dados);

    if (retorno.status.codigo === 200) {
        var resultado = [];
        try {
            dados.destinos.forEach(element => {
                //Utilização do pacote geolib para facilitar o calculo da distância entre a oriigem e o destino.
                var distancia = geolib.getDistance(
                    {
                        latitude: dados.pontoOrigem.lat, //objeto de origem
                        longitude: dados.pontoOrigem.lon //objeto de origem
                    } ,
                    {
                        latitude: element.lat, //objeto de destivo
                        longitude: element.lon //objeto de destivo
                    });

                resultado.push(
                    {
                        distancia: distancia,
                        coordenadas: element
                    });
            });

            retorno.resultado = resultado.sort(ordenar);
        }
        catch (ex) {
            retorno = falha;
            retorno.erro = ex.message;
        }
    }

    return retorno;
}

function validarDados(dados) {
    var retorno = sucesso;
    if (dados === undefined) {
        falha.erro = "Não foram encontrados dados de entrada no body da requisição.";
        retorno = falha;
    }
    else if (dados.pontoOrigem === undefined) {
        falha.erro = "Deve ser definido um 'pontoOrigem' no body da requisição.";
        retorno = falha;
    }
    else if (dados.pontoOrigem.lat === undefined || dados.pontoOrigem.lon === undefined || dados.pontoOrigem.lat === 0 || dados.pontoOrigem.lon === 0) {
        falha.erro = "O 'pontoOrigem' deve conter as propriedades 'lat' e 'lon' (latitude e longitude respectivamente) e ambos devem ser maiores que zero.";
        retorno = falha;
    }
    else if (dados.destinos === undefined) {
        falha.erro = "Deve ser definido um 'destinos' no body da requisição.";
        retorno = falha;
    }
    else if (dados.destinos.length === 0) {
        falha.erro = "O 'destinos' dve conter um array de objetos com propriedades 'lat' e 'lon' (latitude e longitude respectivamente) e ambos devem ser maiores que zero.";
        retorno = falha;
    } else if (dados.destinos.length > 0) {
        dados.destinos.forEach(element => {
            if (element.lat === undefined || element.lon === undefined || element.lat === 0 || element.lon === 0) {
                falha.erro = "Deve ser definido um 'destinos' no body da requisição.";
                retorno = falha;
            }
        });
    }
    return retorno;
}
//#endregion

//#region Function responsável por auxiliar o método sort a reordenar a lista de destinos.
function ordenar(a, b) {
    return a.distancia - b.distancia;
}

//#endregion

module.exports = geolocation;