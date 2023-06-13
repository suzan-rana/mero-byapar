"use client";
import React, { useEffect, useState } from "react";
import Icons from "./ui/Icon";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useAuthContext } from "@/context/hooks";
import { queryClient } from "./ReactQueryProvider";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";

type Props = {};

const Sidebar = (props: Props) => {
  const pathName = usePathname();
  const [showSideMenu, setShowSideMenu] = useState(false);
  const toggleSideMenu = () => {
    setShowSideMenu((prev) => !prev);
  };
  const { user } = useAuthContext();

  useEffect(() => {
    const currentWidth = window.innerWidth;
    if (currentWidth >= 500) {
      setShowSideMenu(true);
    }
  }, []);

  const handleLogout = () => {
    queryClient.clear();
    Cookies.remove("token");
    window.location.href = "/login";
  };
  console.log(pathName);

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
          "px-3 pt-16 sm:pt-6 overflow-hidden transition-all",
          showSideMenu ? "w-[15rem] opacity-100" : "w-0 h-0  opacity-0",
          "sm:w-auto sm:opacity-100"
        )}
      >
        <h1 className="hidden sm:block text-center text-2xl mb-6 font-bold text-green-700">
          {user?.business.name}
        </h1>
        <main
          className={cn(
            "opacity-0 justify-between h-[80vh] gap-2 pt-2 sm:opacity-100 sm:flex sm:flex-col transition-all",
            showSideMenu
              ? "translate-x-0 opacity-100"
              : "-translate-x-full sm:translate-x-0"
          )}
        >
          <div className="sm:flex flex-col gap-2">
            {sidebarElements.map((item, index) => (
              <SidebarElement
                key={index}
                {...item}
                isActive={pathName === item.link}
              />
            ))}
            {user?.role.role_name === "ADMIN" && (
              <SidebarElement
                name="Team"
                link="/team"
                isActive={pathName === "/team"}
              />
            )}
          </div>
          <p
            onClick={handleLogout}
            className={cn(
              "px-3 block font-medium  cursor-pointer min-w-[15rem]  hover:bg-green-300 py-2"
            )}
          >
            Log out
          </p>
        </main>
      </div>
    </section>
  );
};

export default Sidebar;

const SidebarElement = ({
  isActive,
  link,
  name,
}: {
  name: string;
  link: string;
  isActive: boolean;
}) => {
  return (
    <p
      className={cn(
        "px-3 block font-medium  cursor-pointer min-w-[15rem]  hover:bg-green-300 py-2",
        isActive && "bg-green-300"
      )}
    >
      <Link className="block w-full h-full" href={link}>
        {name}
      </Link>
    </p>
  );
};

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
    name: "To Buy",
    link: "/to-buy",
  },
  {
    name: "Orders",
    link: "/orders",
  },

  {
    name: "Sales",
    link: "/sales",
  },
];
