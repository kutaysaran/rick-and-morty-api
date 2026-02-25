import type { Episode } from "@/types/rick-and-morty";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function EpisodeCard({ episode }: { episode: Episode }) {
  return (
    <Card className="transition-colors hover:border-primary/50">
      <CardContent className="space-y-2 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="line-clamp-1 text-base font-semibold tracking-tight">
              {episode.name}
            </div>
            <div className="text-sm text-muted-foreground">{episode.air_date}</div>
          </div>
          <Badge variant="secondary">{episode.episode}</Badge>
        </div>
        <div className="text-sm text-muted-foreground">Characters: {episode.characters.length}</div>
      </CardContent>
    </Card>
  );
}
