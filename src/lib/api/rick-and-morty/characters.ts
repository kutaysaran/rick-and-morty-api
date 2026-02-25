import { createApiClient } from "@/lib/api/client";
import type { RickAndMortyApiResponse, Character } from "@/types/rick-and-morty";

const rickAndMortyClient = createApiClient({
  baseUrl: "https://rickandmortyapi.com/api/",
});

export interface GetCharactersParams {
  status?: string;
  gender?: string;
  page?: number;
}

export async function getCharacters(
  params: GetCharactersParams = {},
): Promise<RickAndMortyApiResponse<Character>> {
  return await rickAndMortyClient.get<RickAndMortyApiResponse<Character>>("character", {
    query: {
      status: params.status,
      gender: params.gender,
      page: params.page,
    },
  });
}
