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
import { createProductSchema, listProductByCategorySchema, listProductSchema, sendOrderSchema } from "./schemas/productSchema";
import { ListProductController } from "./controllers/product/ListProductController";
import { DeleteProductController } from "./controllers/product/DeleteProductController";
import { ListProductByCategoryController } from "./controllers/product/ListProductByCategoryController";
import { ListOrdersController } from "./controllers/order/ListOrdersController";
import { addItemSchema, createOrderSchema, detailOrderSchema, finishOrderSchema, removeItemSchema } from "./schemas/orderSchema";
import { CreateOrderController } from "./controllers/order/CreateOrderController";
import { AddItemController } from "./controllers/order/AddItemontroller";
import { RemoveItemController } from "./controllers/order/RemoveItemController";
import { DetailOrderController } from "./controllers/order/DetailOrderController";
import { SendOrderController } from "./controllers/order/SendOrderController";
import { FinishOrderController } from "./controllers/order/FinishOrderController";


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

//Listar produtos
router.get(
    "/products",
    isAuthenticated,
    validateSchema(listProductSchema),
    new ListProductController().handle
)

//Deletar produto
router.delete(
    "/product",
    isAuthenticated,
    isAdmin,
    new DeleteProductController().handle
)

//Listar produtos por categoria
router.get(
    "/category/product",
    isAuthenticated,
    validateSchema(listProductByCategorySchema),
    new ListProductByCategoryController().handle
)

// Rotas Order
router.get("/orders",isAuthenticated,new ListOrdersController().handle)

router.post("/order",isAuthenticated,validateSchema(createOrderSchema),new CreateOrderController().handle)

//Adicionar item na ordem
router.post("/order/add",isAuthenticated,validateSchema(addItemSchema),new AddItemController().handle)

//Remover item da ordem
router.delete("/order/remove",isAuthenticated,validateSchema(removeItemSchema),new RemoveItemController().handle)

//Buscar detalhes da order
router.get("/order/detail",isAuthenticated,validateSchema(detailOrderSchema),new DetailOrderController().handle)

//Enviar order
router.put("/order/send",isAuthenticated,validateSchema(sendOrderSchema),new SendOrderController().handle)

//Finalizar order
router.put("/order/finish",isAuthenticated,validateSchema(finishOrderSchema),new FinishOrderController().handle)

export { router }