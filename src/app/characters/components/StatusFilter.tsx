"use client";

import { useCharactersQueryState } from "../use-characters-query-state";
import { CHARACTER_STATUS_VALUES, type CharacterStatusParam } from "../characters-query-parsers";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function StatusFilter() {
  const [{ status }, setQuery] = useCharactersQueryState();

  const value = status ?? "all";

  return (
    <div className="space-y-1">
      <div className="text-sm font-medium">Status</div>
      <Select
        value={value}
        onValueChange={(next) => {
          const nextStatus = next === "all" ? null : (next as CharacterStatusParam);
          void setQuery({ status: nextStatus, page: 1 });
        }}
      >
        <SelectTrigger className="w-full sm:w-[220px]">
          <SelectValue placeholder="All statuses" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {CHARACTER_STATUS_VALUES.map((s) => (
            <SelectItem key={s} value={s}>
              {s}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
