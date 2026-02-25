"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { GetCharactersParams } from "@/lib/api/rick-and-morty/characters";
import { useCharacters } from "@/hooks/use-characters";
import { useCharactersQueryState } from "./use-characters-query-state";
import { useCharacterStore } from "@/store/use-character-store";
import { CharacterGrid } from "./components/character-grid";
import { CharactersFiltersBar } from "./components/characters-filters-bar";

export function CharactersPageClient() {
  const [{ status, gender, page }, setQuery] = useCharactersQueryState();
  const selectedIds = useCharacterStore((state) => state.selectedCharacterIds);
  const selectedCount = selectedIds.size;
  const isSelectionMode = useCharacterStore((state) => state.isSelectionMode);
  const toggleSelected = useCharacterStore((state) => state.actions.toggleSelected);
  const clearSelection = useCharacterStore((state) => state.actions.clearSelection);
  const setSelectionMode = useCharacterStore((state) => state.actions.setSelectionMode);
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
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">Characters</h1>
          <p className="text-sm text-muted-foreground">Loading characters…</p>
        </div>
        <CharactersFiltersBar
          rightSlot={
            <>
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-24" />
            </>
          }
        />
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
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">Characters</h1>
          <p className="text-sm text-muted-foreground">Adjust filters and try again.</p>
        </div>
        <CharactersFiltersBar />
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

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-6">
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight">Characters</h1>
          <Badge variant="secondary">Selected: {selectedCount}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          Page {page} of {data?.info.pages ?? 0}. Filters are SSR-driven.
        </p>
      </div>

      <CharactersFiltersBar
        rightSlot={
          <>
            <Button
              type="button"
              variant="outline"
              onClick={() => setSelectionMode(!isSelectionMode)}
            >
              {isSelectionMode ? "Selection: On" : "Selection: Off"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => clearSelection()}
              disabled={selectedCount === 0}
            >
              Clear
            </Button>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => void setQuery({ page: Math.max(1, page - 1) })}
                disabled={page <= 1}
              >
                Prev
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => void setQuery({ page: page + 1 })}
                disabled={Boolean(data?.info.pages) && page >= (data?.info.pages ?? 0)}
              >
                Next
              </Button>
            </div>
          </>
        }
      />

      <CharacterGrid
        characters={data?.results ?? []}
        isSelected={isSelected}
        isSelectionMode={isSelectionMode}
        onToggleSelected={toggleSelected}
      />
    </div>
  );
}
