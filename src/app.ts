import "dotenv/config";

import  express from "express";

import { router } from "./routes";

import http from "http";

import cors from "cors";

import {Server} from "socket.io"



const app = express();

app.use(cors());

const serverHttp = http.createServer(app);

// Define quem consegue conectar
const io = new Server(serverHttp,{
    cors:{
        origin: "*"
    }
});

io.on("connection",(socket) => {
    console.log( `Usuario  conectado ao socket ${socket}` )
})


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

export {serverHttp,io}