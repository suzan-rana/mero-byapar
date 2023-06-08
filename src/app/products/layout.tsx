import Sidebar from "@/components/Sidebar";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <main className="flex sm:gap-6 max-h-screen  overflow-hidden">
      <Sidebar />
      <div className="pt-20 sm:pt-6 overflow-y-scroll overflow-x-hidden sm:overflow-x-auto grow pr-8 pb-20"> {children}</div>
    </main>
  );
};

export default Layout;
