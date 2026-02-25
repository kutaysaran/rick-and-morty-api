import { parseAsInteger, parseAsStringLiteral } from "nuqs";

export const CHARACTER_STATUS_VALUES = ["alive", "dead", "unknown"] as const;
export type CharacterStatusParam = (typeof CHARACTER_STATUS_VALUES)[number];

export const CHARACTER_GENDER_VALUES = ["female", "male", "genderless", "unknown"] as const;
export type CharacterGenderParam = (typeof CHARACTER_GENDER_VALUES)[number];

export const charactersQueryParsers = {
  status: parseAsStringLiteral(CHARACTER_STATUS_VALUES),
  gender: parseAsStringLiteral(CHARACTER_GENDER_VALUES),
  page: parseAsInteger.withDefault(1),
};
