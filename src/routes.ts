import { Router,Request,Response } from "express";
import { CreateUserController } from "./controllers/user/createUserController";
import { validateSchema } from "./middlewares/validateShema";
import { authUserSchema, createUserSchema } from "./schemas/userSchema";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from "./middlewares/isAutehenticated";
import { CreateCategoryController } from "./controllers/category/Createcategory";
import { isAdmin } from "./middlewares/isAdmin";
import { createCategorySchema } from "./schemas/categorySchema";
import { ListCategoryController } from "./controllers/category/ListCategoryController";

const router = Router();

// Rotas users
router.post("/users",validateSchema(createUserSchema),new CreateUserController().handle)
router.post("/session",validateSchema(authUserSchema),new AuthUserController().handle)
router.get("/me",isAuthenticated,new DetailUserController().handle)

// Rotas categoria
router.post("/category",isAuthenticated,isAdmin,validateSchema(createCategorySchema),new CreateCategoryController().handle)
router.get("/category",isAuthenticated,new ListCategoryController().handle)


export { router }