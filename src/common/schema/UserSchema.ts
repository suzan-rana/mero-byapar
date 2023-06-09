import { z } from "zod";

export const LoginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
export type loginUserType = z.infer<typeof LoginUserSchema>;

export const CreateRootUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string(),
  contact_number: z.string().min(10),
  business: z.object({
    name: z.string(),
    email: z.string().email(),
    contact_number: z.string().min(10),
    description: z.string(),
  }),
});
export type CreateRootUserType = z.infer<typeof CreateRootUserSchema>;

export const CreateNewUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string(),
  contact_number: z.string().min(10),
  businessId: z.string(),
  positionId: z.string(),
});
export type CreateNewUserType = z.infer<typeof CreateNewUserSchema>;

export const UpdateUserSchema = CreateNewUserSchema.pick({
  name: true,
  email: true,
  contact_number: true,
})
  .partial()
  .extend({
    id: z.string(),
  });
export type UpdateUserType = z.infer<typeof UpdateUserSchema>;
