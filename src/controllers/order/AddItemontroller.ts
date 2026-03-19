import { Request,Response } from "express";
import { AddItemOrderService } from "../../service/order/AddItemOrderService";

class AddItemController{
    async handle(req:Request, res:Response){
        const {order_id, product_id, amount} = req.body

        const addItem = new AddItemOrderService()

        const newitem = await addItem.execute({
            order_id: order_id,
            product_id: product_id,
            amount: amount
        })

        res.status(201).json(newitem)
    }
}

export {AddItemController}