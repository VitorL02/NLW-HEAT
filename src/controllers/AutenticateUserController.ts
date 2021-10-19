import { Response,Request } from "express";
import { AuthenticateUserServer } from "../services/AutenticationUserServer";

// Guardando as informações de autenticação do usuario,um detalhe e que essa classe so recebe strings

class AutenticateUserController{

    async handle (request : Request ,response : Response) {

        const {code} = request.body

        const service = new AuthenticateUserServer();
        const result = await service.execute (code)
        
        return response.json(result);
    }

}


export {AutenticateUserController}; 