"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { GetEpisodesParams } from "@/lib/api/rick-and-morty/episodes";
import { useEpisodes } from "@/hooks/use-episodes";
import { EpisodeGrid } from "./components/episode-grid";
import { useEpisodesQueryState } from "./use-episodes-query-state";

export function EpisodesPageClient() {
  const [{ page }, setQuery] = useEpisodesQueryState();

  const params: GetEpisodesParams = { page };
  const { data, error, isPending } = useEpisodes(params);

  if (isPending) {
    return (
      <div className="mx-auto w-full max-w-6xl space-y-6 p-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">Episodes</h1>
          <p className="text-sm text-muted-foreground">Loading episodes…</p>
        </div>
        <Card className="p-4">
          <div className="flex items-center justify-between gap-3">
            <Skeleton className="h-9 w-40" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-9 w-20" />
              <Skeleton className="h-9 w-20" />
            </div>
          </div>
        </Card>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }).map((_, idx) => (
            <Card key={idx}>
              <CardContent className="space-y-2 p-4">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-24" />
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
          <h1 className="text-2xl font-semibold tracking-tight">Episodes</h1>
          <p className="text-sm text-muted-foreground">Try again.</p>
        </div>
        <Card className="border-destructive/30">
          <CardContent className="space-y-2 p-4">
            <div className="text-sm font-medium text-destructive">Failed to load episodes</div>
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
          <h1 className="text-2xl font-semibold tracking-tight">Episodes</h1>
          <Badge variant="secondary">
            Page {page} / {data?.info.pages ?? 0}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">Pagination is SSR-driven via nuqs.</p>
      </div>

      <Card className="p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-muted-foreground">
            Total episodes: {data?.info.count ?? 0}
          </div>
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
        </div>
      </Card>

      <EpisodeGrid episodes={data?.results ?? []} />
    </div>
  );
}
