import Sidebar from "@/components/Sidebar";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {};

const Home = (props: Props) => {
  return (
    <main className="flex">
      <Sidebar />
      {/* <p>Hello, world</p> */}
    </main>
  );
};

export default Home;
