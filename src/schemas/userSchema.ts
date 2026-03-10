import { email, z } from "zod";


export const createUserSchema = z.object({
    body: z.object({
        name: z.string({message:"O nome precisa ser um texto!"})
        .min(3,{message:"O nome precisa ter no minimo 3 letras!"}),
        email: z.email({message:"Precisa ser um email válido!"}),
        password: z.string().min(6,{message:"A senha tem que ter nomínimo 6 caracteres"})
    })
})

export const authUserSchema = z.object({
    body: z.object({
        email: z.email({message:"Precisa ser um email válido!"}),
        password: z.string({message: "A senha é obrigatória"}).min(1,{message: "Senha tem que ter no minimo 5 caracteres!"})
    })
})