import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { GetCharactersParams } from "@/lib/api/rick-and-morty/characters";
import { getCharacters } from "@/lib/api/rick-and-morty/characters";
import { getQueryClient } from "@/lib/react-query/query-client";
import { charactersQueryKey } from "@/hooks/use-characters";
import { CharactersPageClient } from "./CharactersPageClient";

type SearchParamValue = string | string[] | undefined;

function getFirstSearchParam(value: SearchParamValue): string | undefined {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value[0];
  return undefined;
}

function parsePositiveInt(value: string | undefined): number | undefined {
  if (!value) return undefined;
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) return undefined;
  return parsed;
}

function parseCharactersSearchParams(
  searchParams: Record<string, SearchParamValue>,
): GetCharactersParams {
  const status = getFirstSearchParam(searchParams.status)?.trim();
  const gender = getFirstSearchParam(searchParams.gender)?.trim();
  const page = parsePositiveInt(getFirstSearchParam(searchParams.page));

  const params: GetCharactersParams = {};
  if (status && status.length > 0) params.status = status;
  if (gender && gender.length > 0) params.gender = gender;
  if (typeof page === "number") params.page = page;

  return params;
}

export default async function CharactersPage({
  searchParams,
}: {
  searchParams: Record<string, SearchParamValue>;
}) {
  const params = parseCharactersSearchParams(searchParams);

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: charactersQueryKey(params),
    queryFn: () => getCharacters(params),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <CharactersPageClient params={params} />
    </HydrationBoundary>
  );
}
