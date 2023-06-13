"use client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import React from "react";

type Props = {
  children: React.ReactNode;
};
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 5, // 5 mins
    },
  },
});

const ReactQueryProvider = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
