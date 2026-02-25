"use client";

import { Button } from "@/components/ui/button";
import type { GetCharactersParams } from "@/lib/api/rick-and-morty/characters";
import { useCharacters } from "@/hooks/use-characters";
import { GenderFilter } from "./components/GenderFilter";
import { StatusFilter } from "./components/StatusFilter";
import { useCharactersQueryState } from "./use-characters-query-state";

export function CharactersPageClient() {
  const [{ status, gender, page }, setQuery] = useCharactersQueryState();

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
        </div>
        <Button type="button" variant="outline" onClick={() => window.location.reload()}>
          Refresh
        </Button>
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
          <li key={character.id} className="rounded-lg border bg-card p-4">
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
