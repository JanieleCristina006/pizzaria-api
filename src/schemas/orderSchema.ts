import { z } from "zod";

export const createOrderSchema = z.object({
  body: z.object({
    table: z
      .number({ message: "O número da mesa é obrigatório" })
      .int({ message: "O número da mesa deve ser um número inteiro" })
      .positive({ message: "O número da mesa deve ser um número positivo" }),
    name: z.string().optional(),
  }),
});


export const addItemOrderSchema = z.object({
  body: z.object({
    order_id: z.string({ message: "O ID da ordem é obrigatório" }),
    product_id: z.string({ message: "O ID do produto é obrigatório" }),
    amount: z
      .number({ message: "A quantidade é obrigatória" })
      .int({ message: "A quantidade deve ser um número inteiro" })
      .positive({ message: "A quantidade deve ser um número positivo" }),
  }),
});