"use client";

import { useQueryStates } from "nuqs";
import { episodesQueryParsers } from "./episodes-query-parsers.client";

export function useEpisodesQueryState() {
  return useQueryStates(episodesQueryParsers, { shallow: false });
}
