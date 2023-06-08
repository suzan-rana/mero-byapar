import Sidebar from "@/components/Sidebar";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <main className="flex gap-6">
      <Sidebar />
      <div className="pt-20 sm:pt-6"> {children}</div>
    </main>
  );
};

export default Layout;
