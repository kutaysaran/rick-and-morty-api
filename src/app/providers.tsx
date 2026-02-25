"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { makeQueryClient } from "@/lib/react-query/query-client";

const ReactQueryDevtools =
  process.env.NODE_ENV === "development"
    ? dynamic(
        () => import("@tanstack/react-query-devtools").then((mod) => mod.ReactQueryDevtools),
        { ssr: false },
      )
    : () => null;

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(makeQueryClient);

  return (
    <NuqsAdapter>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </NuqsAdapter>
  );
}
