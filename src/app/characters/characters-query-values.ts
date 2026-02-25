export const CHARACTER_STATUS_VALUES = ["alive", "dead", "unknown"] as const;
export type CharacterStatusParam = (typeof CHARACTER_STATUS_VALUES)[number];

export const CHARACTER_GENDER_VALUES = ["female", "male", "genderless", "unknown"] as const;
export type CharacterGenderParam = (typeof CHARACTER_GENDER_VALUES)[number];
