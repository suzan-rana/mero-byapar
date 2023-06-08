"use client";
import React, { useEffect } from "react";
import "nprogress/nprogress.css";
import NProgress from "nprogress";
import { usePathname } from "next/navigation";
type Props = {
  children: React.ReactNode;
};

const RootTemplate = ({ children }: Props) => {
    const pathName = usePathname()
  useEffect(() => {
    // NProgress.configure( { easing: 'ease', minimum: 15})
    NProgress.start();
    new Promise((resolve) => setTimeout(resolve, 500));
    NProgress.done();
  }, [pathName]);
  return <>{children}</>;
};

export default RootTemplate;
