import { z } from "zod";

export const CreateCategorySchema = z.object({
  category_name: z.string(),
  category_code: z.string().toUpperCase(),
  businessId: z.string(),
});
export type TCreateCategory = z.infer<typeof CreateCategorySchema>;

export const DeleteCategorySchema = z.object({
  categoryId: z.string(),
});
export type TDeleteCategory = z.infer<typeof DeleteCategorySchema>;

export const EditCategorySchema = CreateCategorySchema;
export type TEditCategory = z.infer<typeof EditCategorySchema>;

export const ResponseGetCategorySchema = z.array(
  z.object({
    id: z.string(),
    category_name: z.string(),
    category_code: z.string(),
    businessId: z.string(),
    _count: z.object({
      products: z.number(),
    }),
  })
);
export type TResponseGetCategory = z.infer<typeof ResponseGetCategorySchema>;
