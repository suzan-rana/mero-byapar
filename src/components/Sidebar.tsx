"use client";
import React, { useState } from "react";
import Icons from "./ui/Icon";
import { cn } from "@/lib/utils";

type Props = {};

const Sidebar = (props: Props) => {
  const [showSideMenu, setShowSideMenu] = useState(
    !window.matchMedia("(max-width: 640px)").matches
  );
  const toggleSideMenu = () => {
    setShowSideMenu((prev) => !prev);
  };

  return (
    <section className="max-w-fit">
      <div
        className={cn("pt-4 py-8 px-5 cursor-pointer fixed z-10")}
        onClick={toggleSideMenu}
      >
        {Icons.menu}
      </div>
      <div
        className={cn(
          "px-3 h-screen pt-16 bg-gray-200 overflow-hidden transition-all",
          showSideMenu ? "w-[15rem] opacity-100" : "w-0 h-0  opacity-0",
          "sm:w-auto sm:opacity-100"
        )}
      >
        <main
          className={cn(
            "opacity-0 sm:opacity-100 sm:flex sm:flex-col transition-all",
            showSideMenu ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {sidebarElements.map((item, index) => (
            <p
              key={index}
              className="px-3 cursor-pointer min-w-[15rem] rounded-md hover:bg-gray-100 py-2"
            >
              {item.name}
            </p>
          ))}
        </main>
      </div>
    </section>
  );
};

export default Sidebar;

const sidebarElements = [
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
