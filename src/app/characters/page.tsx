import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { GetCharactersParams } from "@/lib/api/rick-and-morty/characters";
import { getCharacters } from "@/lib/api/rick-and-morty/characters";
import { getQueryClient } from "@/lib/react-query/query-client";
import { charactersQueryKey } from "@/hooks/use-characters";
import { CharactersPageClient } from "./CharactersPageClient";
import {
  loadCharactersSearchParams,
  type CharactersSearchParams,
} from "./characters-search-params";

export default async function CharactersPage({
  searchParams,
}: {
  searchParams: CharactersSearchParams;
}) {
  const parsed = loadCharactersSearchParams(searchParams);

  const params: GetCharactersParams = { page: parsed.page };
  if (parsed.status) params.status = parsed.status;
  if (parsed.gender) params.gender = parsed.gender;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: charactersQueryKey(params),
    queryFn: () => getCharacters(params),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <CharactersPageClient />
    </HydrationBoundary>
  );
}
