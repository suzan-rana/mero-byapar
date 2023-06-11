"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/hooks";
import Cookies from "js-cookie";

function isAuth<T>(Component: React.ComponentType<T>) {
  return (props: T) => {
    const router = useRouter();

    const { isAuthenticated, user, isLoading, isFetching } = useAuthContext();
    useEffect(() => {
      if (!Cookies.get("token")) {
        router.push("/login");
      }
    }, [router, isAuthenticated]);
    if (isLoading || isFetching) {
      return <p>Loading...</p>;
    } 
    return (
      <>
        <Component {...props!} />
      </>
    );
  };
}
const RouteProtector = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};
export default isAuth(RouteProtector);
