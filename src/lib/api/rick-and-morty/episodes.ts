import type { Episode, RickAndMortyApiResponse } from "@/types/rick-and-morty";
import { rickAndMortyClient } from "./client";

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
