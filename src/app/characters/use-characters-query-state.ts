"use client";

import { useQueryStates } from "nuqs";
import { charactersQueryParsers } from "./characters-query-parsers.client";

export function useCharactersQueryState() {
  return useQueryStates(charactersQueryParsers, { shallow: false });
}
