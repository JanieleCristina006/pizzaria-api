import { Request,Response } from "express";
import { ListOrderService } from "../../service/order/ListOrderService";

class ListOrdersController{
    async handle(req:Request,res:Response){
        const draft = req.query?.draft as string | undefined;

        const listOrders = new ListOrderService();

        const orders = await listOrders.execute({
            draft: draft
        })

        res.json(orders)
    }
}

export {ListOrdersController}