
import prismaClient from "../../prisma/index";

interface FinishOrderProps {
    order_id: string,
}

class FinishOrderService {
    async execute({ order_id }: FinishOrderProps) {
        try {
            const order = await prismaClient.order.findFirst({
                where: {
                    id: order_id
                }
            })
            if (!order) {
                throw new Error("Pedido nao encontrado")
            }


            const updateOrder = await prismaClient.order.update({
                where: {
                    id: order_id
                },
                data: {
                   status: true
                   
                },
                select:{
                    id: true,
                    table: true,
                    status: true,
                    draft: true,
                    name: true,
                    createdAt: true
                }
            })

            return updateOrder
        } catch (error) {
            throw new Error("Falha ao enviar pedido")
        }
    }
}

export { FinishOrderService }