import { TAccessControls, TUserRole } from "@/types";

export function generateAccessControls(
  role: TUserRole | undefined
): TAccessControls | null {
  if (!role) {
    return null;
  }
  switch (role) {
    case "ADMIN":
      return {
        role: "ADMIN",
        can: {
          CREATE: ["PRODUCTS", "SALES", "ORDERS", "TO_BUY", "EMPLOYEES"],
          READ: ["PRODUCTS", "SALES", "ORDERS", "TO_BUY", "EMPLOYEES"],
          UPDATE: ["PRODUCTS", "SALES", "ORDERS", "TO_BUY", "EMPLOYEES"],
          DELETE: ["PRODUCTS", "SALES", "ORDERS", "TO_BUY", "EMPLOYEES"],
        },
      };
    case "EMPLOYEE":
      return {
        role: "EMPLOYEE",
        can: {
          CREATE: ["PRODUCTS", "SALES", "ORDERS", "TO_BUY"],
          READ: ["PRODUCTS", "SALES", "ORDERS", "TO_BUY"],
          UPDATE: ["PRODUCTS", "SALES", "ORDERS", "TO_BUY"],
          DELETE: [],
        },
      };
  }
}
