import { createLoader, type inferParserType, type SearchParams } from "nuqs/server";
import { episodesQueryParsers } from "./episodes-query-parsers.server";

export type EpisodesSearchState = inferParserType<typeof episodesQueryParsers>;
export type EpisodesSearchParams = SearchParams;

export const loadEpisodesSearchParams = createLoader(episodesQueryParsers);
