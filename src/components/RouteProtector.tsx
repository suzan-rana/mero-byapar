"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/hooks";
import Cookies from "js-cookie";
import 'react-loading-skeleton/dist/skeleton.css'
// eslint-disable-next-line react/display-name
function isAuth<T>(Component: React.ComponentType<T>) {
  return (props: T) => {
    const router = useRouter();

    const { isAuthenticated } = useAuthContext();
    useEffect(() => {
      if (!Cookies.get("token")) {
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
