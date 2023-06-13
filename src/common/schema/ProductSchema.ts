import { z } from "zod";

export const CreateProductSchema = z.object({
  product_name: z.string().min(3),
  quantity: z.number().min(1),
  price: z.number().min(1),
  description: z.string(),
  categoryId: z.string(),
  businessId: z.string(),
  toBuyId: z.string(),
  buyerId: z.string(),
});
export type CreateProductType = z.infer<typeof CreateProductSchema>;

export const GetProductSchema = z.object({
  businessId: z.string(),
});
export type TGetProduct = z.infer<typeof GetProductSchema>;

export const ResponseFetchProductsSchema = z.array(
  z.object({
    id: z.string(),
    product_name: z.string().min(3),
    quantity: z.number().min(1),
    price: z.number().min(1),
    description: z.string(),
    categoryId: z.string(),
    businessId: z.string(),
    created_at: z.string().datetime(),
    product_code: z.string(),
    buyer: z.object({
      id: z.string(),
      name: z.string(),
    }),
  })
);
