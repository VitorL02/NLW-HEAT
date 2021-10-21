import { Response,Request } from "express";
import { Geting3LastMessagesService } from "../services/Geting3LastMessagesService";



class Geting3LastMessagesController{

    async handle (request : Request ,response : Response) {

        const service = new Geting3LastMessagesService() ;

        const result = await service.execute();

        return response.json(result);
   
    }

}


export {Geting3LastMessagesController}; 