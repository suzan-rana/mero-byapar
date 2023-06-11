"use client";
import React, { SetStateAction, createContext, useState } from "react";
import { TAccessControls, TUserRole } from "@/types";
import { TCurrentUser } from "@/common/schema/UserSchema";
import { useFetchCurrentUser } from "./hooks";
import { generateAccessControls } from "@/utils/accessControls";

export type TAuthContext = {
  isAuthenticated: boolean;
  accessControls: TAccessControls | undefined;
  user: TCurrentUser | undefined;
  setIsAuthenticated: React.Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  isFetching: boolean;
};

export const AuthContext = createContext<TAuthContext | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // a utility state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { data: user, isLoading, isFetching } = useFetchCurrentUser(isAuthenticated);
  const accessControls = generateAccessControls(user?.role.role_name);
  return (
    <AuthContext.Provider
      value={{
        setIsAuthenticated,
        isAuthenticated,
        accessControls,
        user,
        isLoading,
        isFetching
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
