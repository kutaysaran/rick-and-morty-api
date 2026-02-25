"use client";

import { parseAsInteger } from "nuqs";

export const episodesQueryParsers = {
  page: parseAsInteger.withDefault(1),
};
