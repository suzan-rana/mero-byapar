import React, { createContext } from "react";
import Cookies from "js-cookie";
import { TAccessControls, TEntity, TUserRole } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { fetchCurrentUser } from "@/common/api/user.api";

const AuthContext = createContext(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: user } = useFetchCurrentUser();

  return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
};


export function generateAccessControls(role: TUserRole): TAccessControls {
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

const useFetchCurrentUser = () => {
  return useQuery({
    queryKey: ["fetch-current-user"],
    queryFn: fetchCurrentUser,
  });
};
