import { z } from "zod";

export const UserRoleUnionSchema = z.object({
  role_name: z.union([z.literal("ADMIN"), z.literal("EMPLOYEE")]),
});
export type TUserRole = z.infer<typeof UserRoleUnionSchema>['role_name'];
export type TAccessControls = {
  role: TUserRole;
  can: Record<"CREATE" | "READ" | "UPDATE" | "DELETE", Array<TEntity> | []>;
};
export type TEntity = "PRODUCTS" | "SALES" | "ORDERS" | "TO_BUY" | "EMPLOYEES";
