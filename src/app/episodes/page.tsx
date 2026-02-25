import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { GetEpisodesParams } from "@/lib/api/rick-and-morty/episodes";
import { getEpisodes } from "@/lib/api/rick-and-morty/episodes";
import { episodesQueryKey } from "@/lib/api/rick-and-morty/episodes-query-key";
import { getQueryClient } from "@/lib/react-query/query-client";
import { EpisodesPageClient } from "./EpisodesPageClient";
import { loadEpisodesSearchParams, type EpisodesSearchParams } from "./episodes-search-params";

export default async function EpisodesPage({
  searchParams,
}: {
  searchParams: Promise<EpisodesSearchParams>;
}) {
  const parsed = await loadEpisodesSearchParams(searchParams);

  const params: GetEpisodesParams = { page: parsed.page };

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: episodesQueryKey(params),
    queryFn: () => getEpisodes(params),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <EpisodesPageClient />
    </HydrationBoundary>
  );
}
