"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

  const pageSize = data?.results.length ?? 0;
  const totalCount = data?.info.count ?? 0;
  const showingStart = pageSize > 0 ? (page - 1) * 20 + 1 : 0;
  const showingEnd = pageSize > 0 ? (page - 1) * 20 + pageSize : 0;

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">Episodes</h1>
          <Badge variant="secondary">
            {pageSize > 0 ? `Showing ${showingStart}–${showingEnd}` : "Showing 0"} of {totalCount}
          </Badge>
          <div className="flex items-center gap-1">
            <Button
              aria-label="Previous page"
              disabled={page <= 1}
              onClick={() => void setQuery({ page: Math.max(1, page - 1) })}
              size="icon"
              type="button"
              variant="outline"
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              aria-label="Next page"
              disabled={Boolean(data?.info.pages) && page >= (data?.info.pages ?? 0)}
              onClick={() => void setQuery({ page: page + 1 })}
              size="icon"
              type="button"
              variant="outline"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      <EpisodeGrid episodes={data?.results ?? []} />
    </div>
  );
}
