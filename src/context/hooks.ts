import { fetchCurrentUser } from "@/common/api/user.api";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext, TAuthContext } from "./AuthContext";
import Cookies from "js-cookie";

export const useFetchCurrentUser = (isEnabled: boolean) => {
  return useQuery({
    queryKey: ["fetch-current-user"],
    queryFn: fetchCurrentUser,
    enabled: !!Cookies.get("token") && isEnabled,
    refetchOnWindowFocus: false,
    retry: false,
  });
};
export const useAuthContext = () => {
  if (typeof AuthContext === "undefined" || !AuthContext) {
    throw new Error(
      "AUTH CONTEXT IS NOT DEFINED. SINCE YOU ARE TRYING TO USE IT OUTSIDE ITS SCOPE..."
    );
  }
  return useContext(AuthContext) as TAuthContext;
};
