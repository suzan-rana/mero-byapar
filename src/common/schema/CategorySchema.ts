import { z } from "zod";

export const CreateCategorySchema = z.object({
  category_name: z.string(),
  category_code: z.string().toUpperCase(),
  businessId: z.string(),
});
export type TCreateCategory = z.infer<typeof CreateCategorySchema>;

export const GetCategorySchema = z.object({
  businessId: z.string(),
});
export type TGetCategory = z.infer<typeof GetCategorySchema>;

export const DeleteCategorySchema = z.object({
  categoryId: z.string(),
});
export type TDeleteCategory = z.infer<typeof DeleteCategorySchema>;

export const EditCategorySchema = CreateCategorySchema
export type TEditCategory = z.infer<typeof EditCategorySchema>;
