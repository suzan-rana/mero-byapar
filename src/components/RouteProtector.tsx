"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/hooks";

function isAuth<T>(Component: React.ComponentType<T>) {
  return (props: T) => {
    const router = useRouter();

    const { isAuthenticated, user, isLoading } = useAuthContext();
    useEffect(() => {
      if (!isLoading && (!isAuthenticated || !user)) {
        console.log('IS LOADING...', isLoading)
        console.log('IS authenticated...', isAuthenticated)
        console.log('IS user...', user)
        router.push("/login");
      }
    }, [router, isAuthenticated]);
    if (isLoading) {
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
