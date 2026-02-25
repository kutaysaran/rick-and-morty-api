import { parseAsInteger, parseAsStringLiteral } from "nuqs/server";
import { CHARACTER_GENDER_VALUES, CHARACTER_STATUS_VALUES } from "./characters-query-values";

export const charactersQueryParsers = {
  status: parseAsStringLiteral(CHARACTER_STATUS_VALUES),
  gender: parseAsStringLiteral(CHARACTER_GENDER_VALUES),
  page: parseAsInteger.withDefault(1),
};
