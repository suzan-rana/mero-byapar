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

export const ResponseFetchUserSchema = z.object({
  data: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      email: z.string(),
      contact_number: z.string(),
      role: UserRoleUnionSchema,
      businessId: z.string(),
      created_at: z.string(),
      updated_at: z.string(),
    })
  ),
  message: z.string(),
  totalPages: z.number(),
  totalItems: z.number()
});
export const ResponseFetchUserByUserIdSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  contact_number: z.string(),
  password: z.string(),
  oneTimePassword: z.string().optional().nullable(),
  role: z.object({
    id: z.string(),
    role_name: z.string(),
  }),
  business: z.object({
    id: z.string(),
    name: z.string(),
  }),
});
export type TResponseFetchUserByUserId = z.infer<
  typeof ResponseFetchUserByUserIdSchema
>;
export const ResetPasswordSchema = z.object({
  old_password: z.string(),
  new_password: z.string(),
});
export type TResetPassword = z.infer<typeof ResetPasswordSchema>

export const UpdateProfileSchema = z.object({
  name: z.string(),
  contact_number: z.string()
})
export type TUpdateProfile = z.infer<typeof UpdateProfileSchema>