import { z } from "zod";

export const CreateToBuySchema = z.object({
  product_name: z.string().nonempty().min(3),
  product_price: z.preprocess((val) => Number(val), z.number().min(1)),
  product_code: z.string().nonempty().trim().toUpperCase(),
  quantity: z.preprocess((val) => Number(val), z.number().min(1)),
  buy_from: z.string().nonempty(),
  description: z.string().min(10),
  deadline_date: z
    .string()
    .transform((val) => new Date(val))
    .pipe(z.date()),
  businessId: z.string().nonempty(),
  categoryId: z.string().nonempty(),
});
export type TCreateToBuy = z.infer<typeof CreateToBuySchema>;
export const UpdateToBuySchema = CreateToBuySchema.partial({
  product_name: true,
  product_price: true,
  quantity: true,
  buy_from: true,
  description: true,
})
  .omit({
    businessId: true,
    product_code: true,
    categoryId: true,
    deadline_date: true
  })
  .extend({
    toBuyId: z.string(),
  });
export type TUpdateToBuy = z.infer<typeof UpdateToBuySchema>;

export const DeleteToBuySchema = z.object({
  toBuyId: z.string(),
});
export type TDeleteToBuy = z.infer<typeof DeleteToBuySchema>;

// response from get to buy
export const FetchToBuySchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      product_name: z.string(),
      product_price: z.number(),
      quantity: z.number(),
      buy_from: z.string(),
      businessId: z.string(),
      description: z.string(),
      deadline_date: z
        .string()
        .transform((val) => new Date(val))
        .pipe(z.date()),
      category: z.object({
        id: z.string(),
        category_name: z.string(),
      }),
    })
  ),
  message: z.string(),
  totalPages: z.number(),
  totalItems: z.number(),
});
export const ResponseFetchToBuyByToBuyIdSchema = z.object({
  id: z.string(),
  product_name: z.string(),
  product_price: z.number(),
  product_code: z.string().toUpperCase(),
  quantity: z.number(),
  buy_from: z.string(),
  deadline_date: z.string(),
  created_at: z.string(),
  categoryId: z.string(),
  buyerId: z.string(),
  businessId: z.string(),
  description: z.string(),
  buyer: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    contact_number: z.string(),
    role: z.object({
      role_name: z.string(),
    }),
  }),
  category: z.object({
    category_name: z.string(),
    category_code: z.string(),
  }),
});
