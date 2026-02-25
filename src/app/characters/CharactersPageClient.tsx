"use client";

import { Button } from "@/components/ui/button";
import type { GetCharactersParams } from "@/lib/api/rick-and-morty/characters";
import { useCharacters } from "@/hooks/use-characters";

export function CharactersPageClient({ params }: { params: GetCharactersParams }) {
  const { data, error, isPending } = useCharacters(params);

  if (isPending) {
    return (
      <div className="mx-auto w-full max-w-3xl space-y-4 p-6">
        <h1 className="text-2xl font-semibold tracking-tight">Characters</h1>
        <p className="text-sm text-muted-foreground">Loading…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto w-full max-w-3xl space-y-4 p-6">
        <h1 className="text-2xl font-semibold tracking-tight">Characters</h1>
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
            Hydrated from SSR React Query cache. Page: {data?.info.pages ?? 0} total pages.
          </p>
        </div>
        <Button type="button" variant="outline" onClick={() => window.location.reload()}>
          Refresh
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
