import { createApiClient } from "@/lib/api/client";

export const rickAndMortyClient = createApiClient({
  baseUrl: "https://rickandmortyapi.com/api/",
  defaultFetchOptions: {
    cache: "no-store",
  },
});
