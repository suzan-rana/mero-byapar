"use client";
import React, { useEffect, useState } from "react";
import Icons from "./ui/Icon";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {};

const Sidebar = (props: Props) => {
  const [showSideMenu, setShowSideMenu] = useState(false);
  const toggleSideMenu = () => {
    setShowSideMenu((prev) => !prev);
  };

  useEffect(() => {
    const currentWidth = window.innerWidth;
    if (currentWidth >= 500) {
      setShowSideMenu(true);
    }
  }, []);

  return (
    <section
      className={cn(
        "sm:max-w-fit h-0 bg-gray-200",
        showSideMenu && "w-fit h-screen"
      )}
    >
      <div
        className={cn("pt-4 py-8 px-5 cursor-pointer fixed z-10 sm:hidden ")}
        onClick={toggleSideMenu}
      >
        {Icons.menu}
      </div>
      <div
        className={cn(
          "px-3 pt-16 sm:pt-8 overflow-hidden transition-all",
          showSideMenu ? "w-[15rem] opacity-100" : "w-0 h-0  opacity-0",
          "sm:w-auto sm:opacity-100"
        )}
      >
        {" "}
        <h1 className="hidden sm:block text-center text-2xl my-4 font-bold text-green-700">Mero Byapar</h1>
        <main
          className={cn(
            "opacity-0 gap-2 pt-2 sm:opacity-100 sm:flex sm:flex-col transition-all",
            showSideMenu ? "translate-x-0 opacity-100" : "-translate-x-full"
          )}
        >
          {sidebarElements.map((item, index) => (
            <Link href={item.link}
              key={index}
              className="px-3 block font-semibold cursor-pointer min-w-[15rem] rounded-md hover:bg-gray-100 py-2"
            >
              {item.name}
            </Link>
          ))}
        </main>
      </div>
    </section>
  );
};

export default Sidebar;

const sidebarElements = [
  {
    name: "Dashboard",
    link: "/",
  },
  {
    name: "Products",
    link: "/products",
  },
  {
    name: "Orders",
    link: "/orders",
  },
  {
    name: "To Buy",
    link: "/to-buy",
  },
  {
    name: "Sales",
    link: "/sales",
  },
  {
    name: "Employees",
    link: "/employees",
  },
];
