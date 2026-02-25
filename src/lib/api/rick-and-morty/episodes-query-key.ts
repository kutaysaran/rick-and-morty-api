import type { GetEpisodesParams } from "./episodes";

export const episodesQueryKey = (params: GetEpisodesParams) =>
  ["episodes", { page: params.page }] as const;
