
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

//variaveis de retorno
var emailNotFound = [];
var emailFound = [];
var emailUpdate = [];
var userCreate = [];

async function addClient(user) {
    let urlUserMasterData = `https://${account}.myvtex.com/api/dataentities/CL/documents`;

    const data = {
        ...user,
        ...campos
    }

    try {
        await fetch(`${urlUserMasterData}`, {
            method: 'PATCH',
            headers: {
                Accept: "application/vnd.vtex.ds.v10+json",
                "x-vtex-api-appkey": `${appkey}`,
                "x-vtex-api-apptoken": `${apptoken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });
    }

    catch (err) {
        console.error(err);
    }

    finally {
        userCreate.push(data);
    }
}

async function updateClient(user) {
    let urlUserMasterData = `https://${account}.myvtex.com/api/dataentities/CL/documents`;
    const data = {
        ...user, 
        ...campos
    }

    try {
        await fetch(`${urlUserMasterData}`, {
            method: 'PATCH',
            headers: {
                Accept: "application/vnd.vtex.ds.v10+json",
                "x-vtex-api-appkey": `${appkey}`,
                "x-vtex-api-apptoken": `${apptoken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });
    }

    catch (err) {
        console.error(err);
    }

    finally {
        emailUpdate.push(data);
    }
}

async function getClient(user, index) {
    let urlUserGet = `https://${account}.myvtex.com/api/checkout/pub/profiles?email=${user.email}&_fields=_all`;
    try {
        const infoUser = await fetch(`${urlUserGet}`, {
            method: "GET",
            crossDomain: !0,
            headers: {
                Accept: "application/vnd.vtex.ds.v10+json",
                "x-vtex-api-appkey": `${appkey}`,
                "x-vtex-api-apptoken": `${apptoken}`,
                "Content-Type": "application/json",
            }
        })
        .then(
            (response) => {
                return response.json();
            }
        )
        .catch(
            (error) => {
                console.error("error: ", error);
            }
        )
        return infoUser;
    }
    catch (error) {
        console.error("index: " + index + ", email: " + user.email);
        console.error("error: ", error);
    }
    finally {
        console.log('Get user success')
    }
}

array.forEach(item => item.email = item.email.toLowerCase());

array.map(async(user, index) => {
    const response = await getClient(user, index)
    let urlUserGet = `https://${account}.myvtex.com/api/checkout/pub/profiles?email=${user.email}&_fields=_all`;
    if (response.userProfileId === null) {
        addClient(user)
        emailNotFound.push({...user,urlUserGet,response});
    } else {
        updateClient(user)
        emailFound.push({...user,urlUserGet,response})
    }
});

console.log("|-------------------------------------------------|");
console.info("Emails que existe registro: ", emailFound);
console.log("|-------------------------------------------------|");
console.warn("Emails que não existe registro: ", emailNotFound);
console.log("|-------------------------------------------------|");
console.info("Emails Atualizados: ", emailUpdate);
console.log("|-------------------------------------------------|");
console.info("Usuarios Criados: ", userCreate);
console.log("|-------------------------------------------------|");


