"use client";
import RouteProtector from "@/components/RouteProtector";
import Sidebar from "@/components/Sidebar";
import { useAuthContext } from "@/context/hooks";
import Skeleton from "react-loading-skeleton";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading, isFetching } = useAuthContext();
  return (
    <RouteProtector>
      <main className="flex sm:gap-6 max-h-screen  overflow-hidden">
        <Sidebar />
        <div className="pt-20 sm:pt-6 overflow-y-scroll overflow-x-hidden  grow pr-8 pb-20">
          {isLoading || isFetching ? (
            <Skeleton className="max-w-[80%] my-4 h-[2rem]" count={6} />
          ) : (
            children
          )}
        </div>
      </main>
    </RouteProtector>
  );
}
