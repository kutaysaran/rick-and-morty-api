"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GenderFilter } from "./GenderFilter";
import { StatusFilter } from "./StatusFilter";

export function CharactersFiltersBar({
  rightSlot,
  className,
}: {
  rightSlot?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-xl border bg-card p-4 shadow-sm md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <StatusFilter />
        <GenderFilter />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {rightSlot}
        <Button type="button" variant="outline" onClick={() => window.location.reload()}>
          Refresh
        </Button>
      </div>
    </div>
  );
}
