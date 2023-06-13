import { z } from "zod";
import { UserRoleUnionSchema } from "../../types/index";

export const LoginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
export type loginUserType = z.infer<typeof LoginUserSchema>;

export const CreateRootUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string(),
  contact_number: z.string().min(10).max(12),
  business: z.object({
    name: z.string(),
    email: z.string().email(),
    contact_number: z.string().min(10).max(12),
    description: z.string(),
  }),
});
export type CreateRootUserType = z.infer<typeof CreateRootUserSchema>;

export const CreateNewUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().nonempty(),
  contact_number: z.string().min(10).max(12),
  businessId: z.string(),
  role_name: z.string().nonempty(),
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

export const CurrentUserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  contact_number: z.string(),
  role: UserRoleUnionSchema,
  business: z.object({
    id: z.string(),
    name: z.string(),
  }),
});
export type TCurrentUser = z.infer<typeof CurrentUserSchema>;

export const ResponseLoginUserSchema = z.object({
  token: z.string(),
  message: z.string(),
});

export const ResponseFetchUserSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    contact_number: z.string(),
    role: UserRoleUnionSchema,
    businessId: z.string(),
    created_at: z.string(),
    updated_at: z.string()
  })
);
