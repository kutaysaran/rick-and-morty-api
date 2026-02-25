import { createLoader, type inferParserType, type SearchParams } from "nuqs/server";
import { charactersQueryParsers } from "./characters-query-parsers.server";

export type CharactersSearchState = inferParserType<typeof charactersQueryParsers>;
export type CharactersSearchParams = SearchParams;

export const loadCharactersSearchParams = createLoader(charactersQueryParsers);
