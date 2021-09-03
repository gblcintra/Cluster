### Alterar campos do index.js
```
//insira o account da loja
var account = "nomedaloja";
//inserir a appkey e apptoken da loija
var appkey = "x-vtex-api-appkey";
var apptoken = "x-vtex-api-apptoken";

var campos = {campoDesejado: 'atributo do campo'};

//colocar as informações do usuario para cadastro ou update
var array = [
    {
        document: "11111111111",
        firstName: "Teste1",
        lastName: "Aprovado1",
        email: "teste2@teste.com"
    },
    {
        document: "22222222222",
        firstName: "Teste2",
        lastName: "Aprovado2",
        email: "teste2@teste.com"
    }
];
```

### Depois de alterado copia todo conteudo e joga no console do painel admin da sua loja