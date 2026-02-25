import { parseAsInteger } from "nuqs/server";

export const episodesQueryParsers = {
  page: parseAsInteger.withDefault(1),
};
