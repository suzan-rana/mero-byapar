import { z } from "zod";

export const CreateOrderSchema = z.object({
  productId: z.string(),
  customer_name: z.string(),
  customer_email: z.string().email(),
  customer_contact_number: z.string(),
  quantity: z.number(),
  price: z.number(),
  businessId: z.string(),
});
export type TCreateOrder = z.infer<typeof CreateOrderSchema>;

export const UpdateOrderSchema = CreateOrderSchema.pick({
  customer_name: true,
  customer_contact_number: true,
  customer_email: true,
})
  .partial()
  .extend({
    id: z.string(),
  });
export type TUpdateOrder = z.infer<typeof UpdateOrderSchema>
export const DeleteOrderSchema = z.object({
    id: z.string()
})
export type TDeleteOrder = z.infer<typeof DeleteOrderSchema>