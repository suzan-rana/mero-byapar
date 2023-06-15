"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type Props = {};

const IndexPage = (props: Props) => {
  const router = useRouter();
  useEffect(() => {
    router.push("/home");
  }, [router]);
  return <div>Hello, world!</div>;
};

export default IndexPage;
