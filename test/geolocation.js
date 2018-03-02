/*
* Arquivo: test/geolocation.js
* Author: Luan Fauth
* Description: Arquivo responsável por realizar o TDD com Mocha & Chai no lado do server da app.
* Data: 02/03/2018
* 
*/

process.env.NODE_ENV = "test";

var geolocation = require("../app/api/geolocation");

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
};

var respostaSucesso = {"status":{"codigo":200,"mensagem":"sucesso"},"resultado":[{"distancia":602,"coordenadas":{"lat":-23.537056,"lon":-46.6524309}},{"distancia":671,"coordenadas":{"lat":-23.5315975,"lon":-46.6587622}},{"distancia":9323,"coordenadas":{"lat":-23.6143012,"lon":-46.6693545}},{"distancia":11320,"coordenadas":{"lat":-23.6234021,"lon":-46.7010097}}]};

//Declaração das dependências necessárias para realizar os testes
var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var should = chai.should();

chai.use(chaiHttp);

//O bloco principal que executará os testes:
describe("geolocation", function() {
    //Bloco de execução de todos os testes que fazem parte da 
    //validação dos dados recebidos para que o calculo ocorra da forma correta
  describe("- POST geolocation testes de erro/validação", function() {
    it("Deve retornar mensagem de erro sobre a falta da propriedade pontoOrigem.", function(done) {
      chai
        .request(server)
        .post("/")
        .send({})
        .end(function(error, res) {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("status");
          res.body.status.should.have.property("codigo");
          res.body.status.should.have.property("codigo").equal(550);
          res.body.status.should.have.property("mensagem");
          res.body.erro.should.be.equal(
            "Deve ser definido um 'pontoOrigem' no body da requisição."
          );
          done();
        });
    });

    it("Deve retornar mensagem de erro sobre a falta de valor da propriedade pontoOrigem.", function(done) {
      chai
        .request(server)
        .post("/")
        .send({ pontoOrigem: 0 })
        .end(function(error, res) {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("status");
          res.body.status.should.have.property("codigo");
          res.body.status.should.have.property("codigo").equal(550);
          res.body.status.should.have.property("mensagem");
          res.body.erro.should.be.equal(
            "O 'pontoOrigem' deve conter as propriedades 'lat' e 'lon' (latitude e longitude respectivamente) e ambos devem ser maiores que zero."
          );
          done();
        });
    });

    it("Deve retornar mensagem de erro sobre a falta da propriedade destinos.", function(done) {
      var entrada = {
        pontoOrigem: { lat: -23.5316224, lon: -46.6521961 }
      };
      chai
        .request(server)
        .post("/")
        .send(entrada)
        .end(function(error, res) {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("status");
          res.body.status.should.have.property("codigo");
          res.body.status.should.have.property("codigo").equal(550);
          res.body.status.should.have.property("mensagem");
          res.body.erro.should.be.equal(
            "Deve ser definido um 'destinos' no body da requisição."
          );
          done();
        });
    });

    it("Deve retornar mensagem de erro sobre a falta de valores/array vazio na propriedade destinos.", function(done) {
      var entrada = {
        pontoOrigem: { lat: -23.5316224, lon: -46.6521961 },
        destinos: []
      };
      chai
        .request(server)
        .post("/")
        .send(entrada)
        .end(function(error, res) {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("status");
          res.body.status.should.have.property("codigo");
          res.body.status.should.have.property("codigo").equal(550);
          res.body.status.should.have.property("mensagem");
          res.body.erro.should.be.equal(
            "O 'destinos' deve conter um array de objetos com propriedades 'lat' e 'lon' (latitude e longitude respectivamente) e ambos devem ser maiores que zero."
          );
          done();
        });
    });

    it("Deve retornar mensagem de erro sobre a falta de valores de algum dos destinos na propriedade destinos.", function(done) {
      var entrada = {
        pontoOrigem: { lat: -23.5316224, lon: -46.6521961 },
        destinos: [
          { lat: -23.5315975, lon: -46.6587622 },
          { lat: -23.6143012, lon: -46.6693545 },
          { lat: 0, lon: -46.7010097 },
          { lat: -23.537056, lon: 0 }
        ]
      };
      chai
        .request(server)
        .post("/")
        .send(entrada)
        .end(function(error, res) {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("status");
          res.body.status.should.have.property("codigo");
          res.body.status.should.have.property("codigo").equal(550);
          res.body.status.should.have.property("mensagem");
          res.body.erro.should.be.equal(
            "O destino no index 2 não pode conter um de seus valores nulo, indefinido ou zero."
          );
          done();
        });
    });
  });

  //Bloco de execução em que testa a unica forma de funcionamento da API
  describe("- POST geolocation testes de suesso", function() {
    it("Deve retornar sucesso no calculo e ordenação do objeto.", function(done) {
      var entrada = {
        pontoOrigem: { lat: -23.5316224, lon: -46.6521961 },
        destinos: [
          { lat: -23.5315975, lon: -46.6587622 },
          { lat: -23.6143012, lon: -46.6693545 },
          { lat: -23.6234021, lon: -46.7010097 },
          { lat: -23.537056, lon: -46.6524309 }
        ]
      };
      chai
        .request(server)
        .post("/")
        .send(entrada)
        .end(function(error, res) {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("status");
          res.body.status.should.have.property("codigo");
          res.body.status.should.have.property("codigo").equal(200);
          res.body.status.should.have.property("mensagem");
          res.body.resultado.should.be.deep.equal(respostaSucesso.resultado);
          done();
        });
    });
  });
});
