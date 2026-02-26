"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GetCharactersParams } from "@/lib/api/rick-and-morty/characters";
import { useCharacters } from "@/hooks/use-characters";
import { useCharactersQueryState } from "./use-characters-query-state";
import { useCharacterStore } from "@/store/use-character-store";
import { CharacterGrid } from "./components/character-grid";
import { GenderFilter } from "./components/GenderFilter";
import { StatusFilter } from "./components/StatusFilter";

export function CharactersPageClient() {
  const [{ status, gender, page }, setQuery] = useCharactersQueryState();
  const selectedIds = useCharacterStore((state) => state.selectedCharacterIds);
  const selectedCount = selectedIds.size;
  const toggleSelected = useCharacterStore((state) => state.actions.toggleSelected);
  const clearSelection = useCharacterStore((state) => state.actions.clearSelection);
  const isSelected = React.useCallback(
    (characterId: number) => selectedIds.has(characterId),
    [selectedIds],
  );

  const params: GetCharactersParams = { page };
  if (status) params.status = status;
  if (gender) params.gender = gender;

  const { data, error, isPending } = useCharacters(params);

  if (isPending) {
    return (
      <div className="mx-auto w-full max-w-6xl space-y-6 p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tight">Characters</h1>
            <Skeleton className="h-6 w-36" />
            <Skeleton className="h-6 w-28" />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Skeleton className="h-9 w-[160px]" />
            <Skeleton className="h-9 w-[160px]" />
            <Skeleton className="h-9 w-28" />
            <div className="flex items-center gap-1">
              <Skeleton className="size-9" />
              <Skeleton className="size-9" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }).map((_, idx) => (
            <Card key={idx} className="overflow-hidden">
              <Skeleton className="aspect-square w-full rounded-none" />
              <CardContent className="space-y-2 p-4">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto w-full max-w-6xl space-y-6 p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tight">Characters</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <StatusFilter variant="inline" />
            <GenderFilter variant="inline" />
            <Button
              type="button"
              variant="outline"
              onClick={() => void setQuery({ status: null, gender: null, page: 1 })}
              disabled={!status && !gender}
            >
              Clear filters
            </Button>
          </div>
        </div>
        <Card className="border-destructive/30">
          <CardContent className="space-y-2 p-4">
            <div className="text-sm font-medium text-destructive">Failed to load characters</div>
            <div className="text-sm text-muted-foreground">
              {error.message} (HTTP {error.status})
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const pageSize = data?.results.length ?? 0;
  const totalCount = data?.info.count ?? 0;
  const showingStart = pageSize > 0 ? (page - 1) * 20 + 1 : 0;
  const showingEnd = pageSize > 0 ? (page - 1) * 20 + pageSize : 0;

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">Characters</h1>
          <Badge variant="secondary">
            {pageSize > 0 ? `Showing ${showingStart}–${showingEnd}` : "Showing 0"} of {totalCount}{" "}
            results
          </Badge>
          <div className="flex items-center gap-1">
            <Button
              aria-label="Previous page"
              disabled={page <= 1}
              onClick={() => void setQuery({ page: Math.max(1, page - 1) })}
              size="sm"
              type="button"
              variant="outline"
            >
              <ChevronLeft className="size-3" />
            </Button>
            <Button
              aria-label="Next page"
              disabled={Boolean(data?.info.pages) && page >= (data?.info.pages ?? 0)}
              onClick={() => void setQuery({ page: page + 1 })}
              size="sm"
              type="button"
              variant="outline"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
          <Badge variant="secondary">Selected: {selectedCount}</Badge>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <StatusFilter variant="inline" />
          <GenderFilter variant="inline" />
        </div>
        <div className="flex items-center gap-2">
          {status ? (
            <Badge className="gap-1" variant="outline">
              Status: {status}
              <button
                aria-label="Remove status filter"
                className="ml-1 inline-flex rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                onClick={() => void setQuery({ status: null, page: 1 })}
                type="button"
              >
                <X className="size-3.5" />
              </button>
            </Badge>
          ) : null}
          {gender ? (
            <Badge className="gap-1" variant="outline">
              Gender: {gender}
              <button
                aria-label="Remove gender filter"
                className="ml-1 inline-flex rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                onClick={() => void setQuery({ gender: null, page: 1 })}
                type="button"
              >
                <X className="size-3.5" />
              </button>
            </Badge>
          ) : null}
          <Button
            type="button"
            variant="outline"
            onClick={() => void setQuery({ status: null, gender: null, page: 1 })}
            disabled={!status && !gender}
          >
            Clear filters
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={clearSelection}
            disabled={selectedCount === 0}
          >
            Clear selection
          </Button>
        </div>
      </div>

      <CharacterGrid
        characters={data?.results ?? []}
        isSelected={isSelected}
        onToggleSelected={toggleSelected}
      />
    </div>
  );
}
