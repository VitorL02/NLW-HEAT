
import axios from "axios";
import prismaClient from "../prisma";
import {sign} from "jsonwebtoken";


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

        const { login , id, avatar_url, name} = response.data

        let user = await prismaClient.user.findFirst({
            //Faz um Select no banco onde  se o github id ja existe,caso não exista um usuario novo sera criado
            where:{
                github_id : id
            }
        });

        if(!user){
            //Cria o usuario caso o mesmo não exista
            await prismaClient.user.create({
                data: {
                    github_id : id,
                    login,
                    avatar_url,
                    name,
                }
            });
        }

        // Cria o token do usuario quando a requisição e feita
        const token = sign ({
            user: {
                name : user.name,
                avatar_url : user.avatar_url,
                id : user.id
                },
            },
         `${process.env.JWT_SECRET}`,
            {
                subject : user.id,
                expiresIn : "1d" //Coloca a duração do token para um dia
            }
        );

        return {token, user};

    }
}

export {AuthenticateUserServer};