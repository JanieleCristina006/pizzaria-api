import { Request,Response } from "express";

import { FinishOrderService } from "../../services/order/FinishOrderService";

class FinishOrderController {
    async handle(req:Request,res:Response){
        const {order_id} = req.body;        

        const finishOrder = new FinishOrderService();

        const updatedorder = await finishOrder.execute({order_id:order_id})        

        res.json(updatedorder)
    }
}

export {FinishOrderController}