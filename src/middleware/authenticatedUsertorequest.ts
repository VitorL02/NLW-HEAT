import {Request, Response , NextFunction, request} from "express"

import { verify } from "jsonwebtoken";

interface IPayLoad{
    sub :string;
}

// Esse middleware faz a a autenticação se o usuario fez a requisição pelo github e se tem um token ja criado

export function authenticatedUsertorequest(request : Request,response:Response , next : NextFunction) 
{
 const authToken = request.headers.authorization;

    if(!authToken){
        return response.status(401).json({
            errorCode:"Usuario com Token Invalido" 
        });
    }
    
    //O jeito que a const vai receber os dados 
    // [0]Bearer
    //[1] 82889944qwdqwqwdqwqdq token
    
    const [, token ] = authToken.split(" ");
    
    try {

        const { sub } = verify(token, process.env.JWT_SECRET) as IPayLoad //Verifica se o token e valido
        
        request.user_id = sub;


        return next(); // Passa o Middlware pra frente caso o token seja valido

    } catch (err) {
        return response.status(401).json(err);
    }

}