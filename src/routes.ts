import { Router } from "express";
import { AutenticateUserController } from "./controllers/AutenticateUserController";
import { CreateMessageController } from "./controllers/CreateMessageController";
import { Geting3LastMessagesController } from "./controllers/Geting3LastMessagesController";
import { ProfileUsuarioController } from "./controllers/ProfileUsuarioController";
import { authenticatedUsertorequest } from "./middleware/authenticatedUsertorequest";


const router = Router();

router.post("/autenticate", new AutenticateUserController().handle);

router.post ("/messages",authenticatedUsertorequest,new CreateMessageController().handle);

router.get("/last3_messages" , new Geting3LastMessagesController().handle);

router.get("/userprofile" , authenticatedUsertorequest,new ProfileUsuarioController().handle);

export {router} ;