"use client";
import React, { useEffect, useState } from "react";
import Icons from "./ui/Icon";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useAuthContext } from "@/context/hooks";
import { queryClient } from "./ReactQueryProvider";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import Skeleton from "react-loading-skeleton";

type Props = {};

const Sidebar = (props: Props) => {
  const pathName = usePathname();
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

  const handleLogout = () => {
    queryClient.clear();
    Cookies.remove("token");
    window.location.href = "/login";
  };

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
        <BusinessName />
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
            <SidebarTeam />
          </div>
          <p
            onClick={handleLogout}
            className={cn(
              "px-3 flex gap-4 items-center font-medium  cursor-pointer min-w-[15rem]  hover:bg-green-300 py-2"
            )}
          >
            {/* {Icons.logout} */}
            <span>Log out</span>
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
  // icon,
}: {
  name: string;
  link: string;
  isActive: boolean;
  // icon: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "px-3 block font-medium  cursor-pointer min-w-[15rem]  hover:bg-green-300 py-2",
        isActive && "bg-green-300"
      )}
    >
      <Link className="flex gap-4 items-center w-full h-full" href={link}>
        {/* {icon} */}
        <span>{name}</span>
      </Link>
    </p>
  );
};

const sidebarElements = [
  {
    name: "Dashboard",
    link: "/",
    // icon: Icons.home,
  },
  {
    name: "Products",
    link: "/products",
    // icon: Icons.product,
  },
  {
    name: "To Buy",
    link: "/to-buy",
    // icon: Icons.toBuy,
  },
  {
    name: "Orders",
    link: "/orders",
    // icon: Icons.order,
  },

  {
    name: "Sales",
    link: "/sales",
    // icon: Icons.sales,
  },
];

import { Raleway } from "next/font/google";
const font = Raleway({
  weight: "500",
  subsets: ["latin"],
});

const BusinessName = () => {
  const { user, isLoading, isFetching } = useAuthContext();

  return (
    <>
      {isLoading || isFetching ? (
        <Skeleton className="my-4 h-[1.75rem]" count={1} />
      ) : (
        <h1 className={cn("hidden sm:block cursor-pointer text-center text-xl mb-6 italic font-semibold", font.className)}>
          {user?.business.name}
        </h1>
      )}
    </>
  );
};

const SidebarTeam = () => {
  const { user, isLoading, isFetching } = useAuthContext();
  const pathName = usePathname();

  if (isLoading || isFetching) {
    return <Skeleton className="my-4 h-[1.75rem]" count={1} />;
  }

  return (
    <>
      {user?.role.role_name === "ADMIN" && (
        <SidebarElement
          name="Team"
          link="/team"
          isActive={pathName === "/team"}
          // icon={Icons.team}
        />
      )}
    </>
  );
};
