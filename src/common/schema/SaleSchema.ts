import { z } from "zod";

export const CreateSalesSchema = z.object({
  sold_price: z.number(),
  sold_quantity: z.number(),
  sellerId: z.string(),
  productId: z.string(),
  soldTo: z.object({
    name: z.string(),
    email: z.string().email(),
    contact_number: z.string(),
  }),
  businessId: z.string(),
  orderId: z.string()
});
export type TCreateSales = z.infer<typeof CreateSalesSchema>
