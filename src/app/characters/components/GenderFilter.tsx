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

export function GenderFilter({
  variant = "stacked",
}: {
  variant?: "stacked" | "inline";
} = {}) {
  const [{ gender }, setQuery] = useCharactersQueryState();

  const value = gender ?? "all";
  const triggerClassName = variant === "inline" ? "h-9 w-[160px]" : "w-full sm:w-[220px]";

  return (
    <div className={variant === "inline" ? "flex items-center gap-2" : "space-y-1"}>
      <div
        className={
          variant === "inline"
            ? "min-w-12 text-xs font-medium text-muted-foreground"
            : "text-sm font-medium"
        }
      >
        Gender
      </div>
      <Select
        value={value}
        onValueChange={(next) => {
          const nextGender = next === "all" ? null : (next as CharacterGenderParam);
          void setQuery({ gender: nextGender, page: 1 });
        }}
      >
        <SelectTrigger className={triggerClassName}>
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
