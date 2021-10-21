import { Response,Request } from "express";
import { AuthenticateUserServer } from "../services/AutenticationUserServer";
import { CreateMessageService } from "../services/CreateMessageService";


// Guardando as informações de autenticação do usuario,um detalhe e que essa classe so recebe strings

class CreateMessageController{

    async handle (request : Request ,response : Response) {
        const {message} = request.body;

        const {user_id} = request;

        const service = new CreateMessageService();

        const result = await service.execute(message,user_id);



        return response.json(result);
        
    }

}


export {CreateMessageController}; 