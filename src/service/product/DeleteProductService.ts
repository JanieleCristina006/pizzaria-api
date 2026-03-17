import prismaClient from "../../prisma/index";

interface DeleteProductServiceProps{
    product_id: string;
}

class DeleteProductService{
    async execute({product_id}:DeleteProductServiceProps){
        try {
            await prismaClient.product.update({
                where:{
                    id: product_id,
                },
                data:{
                    disable: true
                }
            }
            )
            return {message:`Produto foi deletado/arquivado!`}
        } catch (error) {
            console.log(error)
            throw new Error("Falha ao deletar o produto!")
        }
    }
}

export { DeleteProductService }