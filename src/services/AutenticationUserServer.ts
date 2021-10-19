
 import axios from "axios";
import { json } from "express";

// Cria uma inteface para sinalizar qual informação vai ser necessario
interface IAccessTokenResponse{
    access_token:string;
}

// Essa interface filtra tudo que vai ser entregue do usuario,a api do git retorna varias dados que não seram necessarios na aplicação 
interface IUserResponse{
    avatar_url : string,
    login: string,
    id: number,
    name : string,
}

class  AuthenticateUserServer{

    async execute(code : string){
        // Url de "recepção" do usuario
        const url = "https://github.com/login/oauth/access_token"; 

        const {data: accessTokenResponse} = await axios.post<IAccessTokenResponse>(url,null,{
            //Parametros esperados para receber da requisição do usuario
            params: {
                client_id : process.env.github_client_id,
                client_secret : process.env.github_client_secret,
                code,
            },
            headers:{
                // Transforma os parametros recebidos em um json
                "Accept" : "application/json"
            }
        });

        // Pega todas as informações do usuario que esta logado,utilizando a api do github
        const response = await axios.get <IUserResponse>("https://api.github.com/user" , {
            headers:{

                authorization : `Bearer ${accessTokenResponse.access_token}` //Se o token estiver valido o usuario acessa
            },
        });

        return response.data;

    }
}

export {AuthenticateUserServer};