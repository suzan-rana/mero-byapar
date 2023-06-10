"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/hooks";

function isAuth<T>(Component: React.ComponentType<T>) {
  return (props: T) => {
    const router = useRouter();

    const { isAuthenticated } = useAuthContext();
    useEffect(() => {
      if (!isAuthenticated) {
        router.push("/login");
      }
    }, [router, isAuthenticated]);
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
