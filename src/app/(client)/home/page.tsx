"use client";
import useFetchDashboard from "@/common/data-fetching-hooks/dashboard/useFetchDashboard";
import { useAuthContext } from "@/context/hooks";
import React from "react";

type Props = {};

const Home = (props: Props) => {
  const { user } = useAuthContext();
  useFetchDashboard();
  return (
    <main>
      <h1>Hello, {user?.name}</h1>
    </main>
  );
};

export default Home;
