"use client";

import { useCharactersQueryState } from "../use-characters-query-state";
import { CHARACTER_GENDER_VALUES, type CharacterGenderParam } from "../characters-query-values";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function GenderFilter() {
  const [{ gender }, setQuery] = useCharactersQueryState();

  const value = gender ?? "all";

  return (
    <div className="space-y-1">
      <div className="text-sm font-medium">Gender</div>
      <Select
        value={value}
        onValueChange={(next) => {
          const nextGender = next === "all" ? null : (next as CharacterGenderParam);
          void setQuery({ gender: nextGender, page: 1 });
        }}
      >
        <SelectTrigger className="w-full sm:w-[220px]">
          <SelectValue placeholder="All genders" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {CHARACTER_GENDER_VALUES.map((g) => (
            <SelectItem key={g} value={g}>
              {g}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
