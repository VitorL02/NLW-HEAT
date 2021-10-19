
import "dotenv/config"
import  express, { json, response }  from "express";

import { router } from "./routes";



const app = express();

// Informa que sera recebido um json
app.use(express.json());

//Utilizando agora o arquivo router para utilizar as requisições do autenticate
app.use(router);

//Rota de Autenticação do Git
app.get ("/github",(request,response) => {
response.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.github_client_id}`)
})

app.get("/signin/callback",(request,response) => {
    const{code} = request.query //Recebe o codigo retornado pelo github

    return response.json(code); // Retorna o codigo em forma de json na requisição
})

app.listen (3030,() => console.log("servidor funcionado na porta 3030"))