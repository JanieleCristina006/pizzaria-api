import { Router } from "express";
import multer from "multer";
import uploadConfig from "./config/multer";

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
import { CreateProductController } from "./controllers/product/CreateProductController";
import { createProductSchema, listProductSchema } from "./schemas/productSchema";
import { ListProductController } from "./controllers/product/ListProductController";
import { DeleteProductController } from "./controllers/product/DeleteProductController";
const router = Router();
const upload = multer(uploadConfig)

// Rotas usuarios
router.post("/users",validateSchema(createUserSchema),new CreateUserController().handle)
router.post("/session",validateSchema(authUserSchema),new AuthUserController().handle)
router.get("/me",isAuthenticated,new DetailUserController().handle)

// Rotas categoria
router.post("/category",isAuthenticated,isAdmin,validateSchema(createCategorySchema),new CreateCategoryController().handle)
router.get("/category",isAuthenticated,new ListCategoryController().handle)


// Rotas produtos
router.post("/product",
    isAuthenticated,
    isAdmin,
    upload.single("file"),
    validateSchema(createProductSchema),
    new CreateProductController().handle
)

router.get(
    "/products",
    isAuthenticated,
    validateSchema(listProductSchema),
    new ListProductController().handle
)

router.delete(
    "/product",
    isAuthenticated,
    isAdmin,
    new DeleteProductController().handle
)

export { router }