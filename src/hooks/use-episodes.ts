"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { ApiError } from "@/lib/api/client";
import { getEpisodes, type GetEpisodesParams } from "@/lib/api/rick-and-morty/episodes";
import { episodesQueryKey } from "@/lib/api/rick-and-morty/episodes-query-key";
import type { Episode, RickAndMortyApiResponse } from "@/types/rick-and-morty";

export function useEpisodes(
  params: GetEpisodesParams,
): UseQueryResult<RickAndMortyApiResponse<Episode>, ApiError> {
  return useQuery<RickAndMortyApiResponse<Episode>, ApiError>({
    queryKey: episodesQueryKey(params),
    queryFn: () => getEpisodes(params),
  });
}
