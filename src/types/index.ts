import { z } from "zod";

export const UserRoleUnionSchema = z.union([
  z.literal("ADMIN"),
  z.literal("EMPLOYEE"),
]);
export type TUserRole = z.infer<typeof UserRoleUnionSchema>;
export type TAccessControls = {
  role: TUserRole;
  can: Record<"CREATE" | "READ" | "UPDATE" | "DELETE", Array<TEntity> | []>;
};
export type TEntity = "PRODUCTS" | "SALES" | "ORDERS" | "TO_BUY" | "EMPLOYEES";
