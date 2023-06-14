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

export const ResponseFetchProductsSchema = z.object({
  totalPages: z.number(),
  totalItems: z.number(),
  data: z.array(
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
  ),
  message: z.string(),
});
export const ResponseFetchProductItemByProductIdSchema = z.object({
  id: z.string(),
  product_name: z.string().min(3),
  quantity: z.number().min(1),
  price: z.number().min(1),
  description: z.string(),
  categoryId: z.string(),
  businessId: z.string(),
  created_at: z.string().datetime(),
  product_code: z.string(),

  category: z.object({
    id: z.string(),
    category_name: z.string(),
  }),
  buyer: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    role: z.object({
      role_name: z.string(),
    }),
    contact_number: z.string(),
  }),
});
