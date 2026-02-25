import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

export const makeQueryClient = (): QueryClient =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000,
        gcTime: 5 * 60_000,
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  });

export const getQueryClient = cache(makeQueryClient);
