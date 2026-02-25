"use client";

import { useCharactersQueryState } from "../use-characters-query-state";
import { CHARACTER_STATUS_VALUES, type CharacterStatusParam } from "../characters-query-values";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function StatusFilter({
  variant = "stacked",
}: {
  variant?: "stacked" | "inline";
} = {}) {
  const [{ status }, setQuery] = useCharactersQueryState();

  const value = status ?? "all";
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
        Status
      </div>
      <Select
        value={value}
        onValueChange={(next) => {
          const nextStatus = next === "all" ? null : (next as CharacterStatusParam);
          void setQuery({ status: nextStatus, page: 1 });
        }}
      >
        <SelectTrigger className={triggerClassName}>
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
