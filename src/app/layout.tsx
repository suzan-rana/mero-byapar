"use client";
import "./globals.css";
import { Poppins } from "next/font/google";
import "./nprogress.css";
import { useEffect } from "react";
import { Router } from "next/router";
import NProgress from "nprogress";

const p = Poppins({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "MeroByapar",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    NProgress.configure({ easing: "ease", speed: 500 });
    Router.events.on("routeChangeStart", () => NProgress.start());
    Router.events.on("routeChangeComplete", () => NProgress.done());
    Router.events.on("routeChangeError", () => NProgress.done());
  }, []);

  return (
    <html lang="en">
      <body className={p.className}>{children}</body>
    </html>
  );
}
