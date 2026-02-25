"use client";

import { Button } from "@/components/ui/button";
import type { GetCharactersParams } from "@/lib/api/rick-and-morty/characters";
import { useCharacters } from "@/hooks/use-characters";
import { cn } from "@/lib/utils";
import { GenderFilter } from "./components/GenderFilter";
import { StatusFilter } from "./components/StatusFilter";
import { useCharactersQueryState } from "./use-characters-query-state";
import { useCharacterStore } from "@/store/use-character-store";

export function CharactersPageClient() {
  const [{ status, gender, page }, setQuery] = useCharactersQueryState();
  const selectedCount = useCharacterStore((state) => state.selectedCharacterIds.size);
  const isSelectionMode = useCharacterStore((state) => state.isSelectionMode);
  const toggleSelected = useCharacterStore((state) => state.actions.toggleSelected);
  const clearSelection = useCharacterStore((state) => state.actions.clearSelection);
  const setSelectionMode = useCharacterStore((state) => state.actions.setSelectionMode);
  const isSelected = useCharacterStore((state) =>
    state.selectedCharacterIds.has.bind(state.selectedCharacterIds),
  );

  const params: GetCharactersParams = { page };
  if (status) params.status = status;
  if (gender) params.gender = gender;

  const { data, error, isPending } = useCharacters(params);

  if (isPending) {
    return (
      <div className="mx-auto w-full max-w-3xl space-y-4 p-6">
        <h1 className="text-2xl font-semibold tracking-tight">Characters</h1>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <StatusFilter />
          <GenderFilter />
        </div>
        <p className="text-sm text-muted-foreground">Loading…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto w-full max-w-3xl space-y-4 p-6">
        <h1 className="text-2xl font-semibold tracking-tight">Characters</h1>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <StatusFilter />
          <GenderFilter />
        </div>
        <p className="text-sm text-destructive">
          {error.message} (HTTP {error.status})
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Characters</h1>
          <p className="text-sm text-muted-foreground">
            Hydrated from SSR React Query cache. Page {page} of {data?.info.pages ?? 0}.
          </p>
          <p className="text-sm text-muted-foreground">Selected: {selectedCount}</p>
        </div>
        <div className="flex items-center gap-2">
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
          <Button type="button" variant="outline" onClick={() => window.location.reload()}>
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <StatusFilter />
        <GenderFilter />
      </div>

      <div className="flex items-center justify-between gap-3">
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

      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {data?.results.map((character) => (
          <li
            key={character.id}
            className={cn(
              "rounded-lg border bg-card p-4",
              isSelected(character.id) && "border-primary ring-1 ring-primary/30",
              isSelectionMode && "cursor-pointer select-none",
            )}
            onClick={() => {
              if (!isSelectionMode) return;
              toggleSelected(character.id);
            }}
          >
            <div className="font-medium">{character.name}</div>
            <div className="text-sm text-muted-foreground">
              {character.status} • {character.gender}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
