"use client";
import React, { SetStateAction, createContext, useState } from "react";
import { TAccessControls, TUserRole } from "@/types";
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
  // a utility state
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const { data: user, isLoading } = useFetchCurrentUser(isAuthenticated);

  if (isLoading) {
    // show a loading spinner here.
    return <p>Loading...</p>;
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
