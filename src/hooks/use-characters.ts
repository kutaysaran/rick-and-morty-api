"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { ApiError } from "@/lib/api/client";
import { getCharacters, type GetCharactersParams } from "@/lib/api/rick-and-morty/characters";
import type { Character, RickAndMortyApiResponse } from "@/types/rick-and-morty";

export const charactersQueryKey = (params: GetCharactersParams) =>
  ["characters", { status: params.status, gender: params.gender, page: params.page }] as const;

export function useCharacters(
  params: GetCharactersParams,
): UseQueryResult<RickAndMortyApiResponse<Character>, ApiError> {
  return useQuery<RickAndMortyApiResponse<Character>, ApiError>({
    queryKey: charactersQueryKey(params),
    queryFn: () => getCharacters(params),
  });
}
