
import prismaClient from "../../prisma/index";

interface SendOrderProps {
    order_id: string,
    name: string;

}

class SendOrderService {
    async execute({ order_id, name }: SendOrderProps) {
        try {
            const order = await prismaClient.order.findFirst({
                where: {
                    id: order_id
                }
            })
            if (!order) {
                throw new Error("Pedido nao encontrado")
            }

            //Atualiza a propriedade draft para false (enviar para cozinha)

            const updateOrder = await prismaClient.order.update({
                where: {
                    id: order_id
                },
                data: {
                    draft: false,
                    name: name
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

export { SendOrderService }