import prismaClient from "../../prisma/index";
import { cloudinary } from "../../config/cloudinary";
import { Readable } from "node:stream";
import { UploadStream } from "cloudinary";

interface CreateProductProps {
    name:string,
    price:number,
    description:string,
    category_id:string,
    imageBuffer:Buffer
    imageName:string
}

class CreateProductService {
    async execute({name,price,description,category_id,imageBuffer,imageName}:CreateProductProps){

        const categoryExists = await prismaClient.category.findFirst({where:{id:category_id}})

        if(!categoryExists){
            throw new Error("Categoria não encontrada!")
        }

        // Enviar para o Cloudinary salvar a imagem e pegar a URL

        let bannerUrl = "";

        try {
            const result = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream({
                        resource_type: "image",
                        folder: "products",
                        public_id:`${Date.now()}-${imageName.split(".")[0]}`,
                    },
                    (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                    }
                )

                // Salvar a url da imagem no banco de dados como um novo produto.
            const bufferStream = Readable.from(imageBuffer);
            bufferStream.pipe(uploadStream)
            })

            console.log(result)
        } catch (error) {
            console.log(error)
            throw new Error("Erro ao enviar imagem para o Cloudinary")
        }

        return "Produto criado com sucesso"
    }
}

export { CreateProductService }