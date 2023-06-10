'use client';
import React, { SetStateAction, createContext, useState } from "react";
import { TAccessControls, TUserRole } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { fetchCurrentUser } from "@/common/api/user.api";
import { TCurrentUser } from "@/common/schema/UserSchema";
import { useFetchCurrentUser } from "./hooks";
import { generateAccessControls } from "@/utils/accessControls";

export type TAuthContext = {
  isAuthenticated: boolean;
  accessControls: TAccessControls | null;
  user: TCurrentUser | undefined;
  setIsAuthenticated: React.Dispatch<SetStateAction<boolean>>;
};

export const AuthContext = createContext<TAuthContext | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { data: user, isLoading } = useFetchCurrentUser();

  // a utility state

  if (isLoading) {
    // show a loading spinner here.
    return null;
  }
  const accessControls = generateAccessControls(user?.role);

  return (
    <AuthContext.Provider
      value={{
        setIsAuthenticated,
        isAuthenticated,
        accessControls,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
