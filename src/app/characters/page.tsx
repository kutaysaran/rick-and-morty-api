import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { GetCharactersParams } from "@/lib/api/rick-and-morty/characters";
import { getCharacters } from "@/lib/api/rick-and-morty/characters";
import { charactersQueryKey } from "@/lib/api/rick-and-morty/characters-query-key";
import { getQueryClient } from "@/lib/react-query/query-client";
import { CharactersPageClient } from "./CharactersPageClient";
import {
  loadCharactersSearchParams,
  type CharactersSearchParams,
} from "./characters-search-params";

export default async function CharactersPage({
  searchParams,
}: {
  searchParams: Promise<CharactersSearchParams>;
}) {
  const parsed = await loadCharactersSearchParams(searchParams);

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
