
 import axios from "axios";
import { json } from "express";

class  AuthenticateUserServer{

    async execute(code : string){
        // Url de "recepção" do usuario
        const url = "https://github.com/login/oauth/access_token"; 

        const response = await axios.post(url,null,{
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

        return response.data;

    }
}

export {AuthenticateUserServer};