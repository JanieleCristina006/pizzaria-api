import { compare } from "bcryptjs";
import prismaClient from "../../prisma/index";
import { sign } from 'jsonwebtoken'

interface AuthServiceProps {
    email: string;
    password: string
}

class AuthUserService{
    async execute({ email,password }:AuthServiceProps){
        
        const user = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        if(!user){
            throw new Error("Usuário ou senha inválidos")
        }

        // Verificar se a senha está correta.
        const passwordMatch = await compare(password,user.password);

        if(!passwordMatch){
            throw new Error("Usuário ou senha inválidos")
        }

        const token = sign(
            {
                name: user.name,
                email: user.email
           },
           process.env.JWT_SECRET as string,
           {
                subject: user.id,
                expiresIn: "30d"     
           }
        )

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: token
        }
    }
}

export {AuthUserService}