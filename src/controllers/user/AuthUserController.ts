import { Request,Response } from "express";
import { AuthUserService } from "../../services/user/AuthUserService";


class AuthUserController {
    async handle(req:Request, res:Response){
         const { email,password } = req.body;

         console.log({email,password})

         const authservice = new AuthUserService();

         const session = await authservice.execute({email,password})

         res.json(session)
    }
}

export { AuthUserController }