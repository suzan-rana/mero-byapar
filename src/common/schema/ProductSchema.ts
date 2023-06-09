import { z } from "zod";

export const CreateProductSchema = z.object({
  product_name: z.string(),
  product_code: z.string(),
  quantity: z.number().min(1),
  price: z.number().min(1),
  description: z.string(),
  categoryId: z.string(),
  businessId: z.string(),
});
export type CreateProductType = z.infer<typeof CreateProductSchema>