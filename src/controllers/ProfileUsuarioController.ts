import { Response,Request } from "express";

import { ProfileUsuario } from "../services/ProfileUsuario";



class ProfileUsuarioController{

    async handle (request : Request ,response : Response) {
        
        const {user_id} = request;

        const service = new ProfileUsuario();

        const result = await service.execute(user_id);

        return response.json(result);
    }

}


export {ProfileUsuarioController}; 