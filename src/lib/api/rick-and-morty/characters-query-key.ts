import type { GetCharactersParams } from "./characters";

export const charactersQueryKey = (params: GetCharactersParams) =>
  ["characters", { status: params.status, gender: params.gender, page: params.page }] as const;
