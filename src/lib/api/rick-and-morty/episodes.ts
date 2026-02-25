import { createApiClient } from "@/lib/api/client";
import type { Episode, RickAndMortyApiResponse } from "@/types/rick-and-morty";

const rickAndMortyClient = createApiClient({
  baseUrl: "https://rickandmortyapi.com/api/",
});

export interface GetEpisodesParams {
  page?: number;
}

export async function getEpisodes(
  params: GetEpisodesParams = {},
): Promise<RickAndMortyApiResponse<Episode>> {
  return await rickAndMortyClient.get<RickAndMortyApiResponse<Episode>>("episode", {
    query: {
      page: params.page,
    },
  });
}
