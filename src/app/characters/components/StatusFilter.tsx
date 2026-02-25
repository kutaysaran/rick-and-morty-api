"use client";

import * as React from "react";
import { useCharactersQueryState } from "../use-characters-query-state";
import { CHARACTER_STATUS_VALUES, type CharacterStatusParam } from "../characters-query-parsers";

export function StatusFilter() {
  const [{ status }, setQuery] = useCharactersQueryState();

  const value = status ?? "";

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const next = event.target.value;
    const nextStatus = next === "" ? null : (next as CharacterStatusParam);

    void setQuery({
      status: nextStatus,
      page: 1,
    });
  };

  return (
    <label className="flex flex-col gap-1">
      <span className="text-sm font-medium">Status</span>
      <select
        className="h-9 rounded-md border bg-background px-3 text-sm"
        value={value}
        onChange={handleChange}
      >
        <option value="">All</option>
        {CHARACTER_STATUS_VALUES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </label>
  );
}
