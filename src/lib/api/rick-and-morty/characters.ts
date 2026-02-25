import type { RickAndMortyApiResponse, Character } from "@/types/rick-and-morty";
import { rickAndMortyClient } from "./client";

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
