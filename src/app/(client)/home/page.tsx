'use client'
import { useAuthContext } from "@/context/hooks";
import React from "react";

type Props = {};

const Home = (props: Props) => {
  const { user } = useAuthContext()
  return (
    <main>
      <h1>Hello, {user?.name}</h1>
    </main>
  );
};

export default Home;
