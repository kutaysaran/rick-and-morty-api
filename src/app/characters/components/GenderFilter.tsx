"use client";

import * as React from "react";
import { useCharactersQueryState } from "../use-characters-query-state";
import { CHARACTER_GENDER_VALUES, type CharacterGenderParam } from "../characters-query-parsers";

export function GenderFilter() {
  const [{ gender }, setQuery] = useCharactersQueryState();

  const value = gender ?? "";

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const next = event.target.value;
    const nextGender = next === "" ? null : (next as CharacterGenderParam);

    void setQuery({
      gender: nextGender,
      page: 1,
    });
  };

  return (
    <label className="flex flex-col gap-1">
      <span className="text-sm font-medium">Gender</span>
      <select
        className="h-9 rounded-md border bg-background px-3 text-sm"
        value={value}
        onChange={handleChange}
      >
        <option value="">All</option>
        {CHARACTER_GENDER_VALUES.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>
    </label>
  );
}
