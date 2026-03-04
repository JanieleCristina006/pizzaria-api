import { Router,Request,Response } from "express";
import { CreateUserController } from "./controllers/user/createUserController";
import { validateSchema } from "./middlewares/validateShema";
import { createUserSchema } from "./schemas/userSchema";

const router = Router();

router.post("/users",validateSchema(createUserSchema),new CreateUserController().handle)

export { router }