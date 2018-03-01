# API: Calculo de proximidade de pontos de geolocalização

Desenvolvimento de uma aplicação em Node.Js para reealizar o calculo da distância em metros entre um ponto e uma lista de outros pontos de destino e ordena a resposta de acordo com a proximidade dos pontos em questão.

## Recursos utilizados no desenvolvimento:

- Node.Js;
- Express.Js ~ v.4.14.0;
- geolib v2.0.24;
- Conceito Rest;
- JSON data (para retornar os dados);
- PostMan (testar a API criada);
- Mocha;
- Chai;

## Testando a Aplicação no Postman:

Para testar as API's criadas no projeto, é necessário te instalado na máquina o [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop).
Depois de realizar o download do Postman, basta realizar os passos abaiaxo para poder testar a API!

## Executar Localmente

Para executar o projeto na sua máquina local, basta seguir os passos abaixo:

## Começando...

Realize o clone do repositório do projeto na sua máquina e instale as dependências.

### Pre-Requisitos

Antes de instalar as dependências no projeto, você precisa já ter instalado na sua máquina:

* **Node.Js**: Caso não tenha, basta realizar o download [Aqui](https://nodejs.org/en/)

### Instalando as Dependências

Abra o prompt de comando e digite a path do seu projeto

```
cd "C:\Users\NomeDoComputador\Documents\..."
```

Quando estiver na pasta do projeto, basta digitar no prompt de comando a seguinte instrução:

```
npm install
```

Ao digitar a instrução acima, automaticamente ele irá baixar todas as dependências listadas no arquivo package.json:

* `node_modules` - que contêm os packages do npm que precisará para o projeto.

### Executando a Aplicação

Aproveitando a janela do prompt de comando, basta iniciar o server para o projeto ser executado localmente.

```
node server.js
```

Assim que no prompt de comando for indicado que o serviço está respondendo na porta 8080, basta abrir o Postman e inicie uma configuração para realizar uma chamada com o método POST.

Não há nencessidade de configurar o header, apenas o body.
Na aba do body da requisição, selecione a opção "raw" e em seguida mude de tipo "Text" para "JSON (application/json)".

### Estrutura do body da requisição
```
{
	"pontoOrigem": {"lat":-23.5316224 , "lon":-46.6521961 },
	"destinos":[
		{"lat":-23.5315975 , "lon":-46.6587622 },
		{"lat":-23.6143012 , "lon":-46.6693545 },
		{"lat":-23.6234021 , "lon":-46.7010097 },
		{"lat":-23.537056 , "lon":-46.6524309 }
	]
}
```

Feito isso, clique em Send!

### Testes automatizados

Para realizar um teste automatizado através do Mocha + Chai, basta digitar o seguinte comando no prompt de comando:
```
npm test
```
