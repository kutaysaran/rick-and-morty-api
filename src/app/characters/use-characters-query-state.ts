"use client";

import { useQueryStates } from "nuqs";
import { charactersQueryParsers } from "./characters-query-parsers";

export function useCharactersQueryState() {
  return useQueryStates(charactersQueryParsers, { shallow: false });
}
