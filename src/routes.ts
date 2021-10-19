import { Router } from "express";
import { AutenticateUserController } from "./controllers/AutenticateUserController";


const router = Router();

router.post("/autenticate", new AutenticateUserController().handle);

export {router} ;