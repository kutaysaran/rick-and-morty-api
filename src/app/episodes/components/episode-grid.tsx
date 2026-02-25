import type { Episode } from "@/types/rick-and-morty";
import { EpisodeCard } from "./episode-card";

export function EpisodeGrid({ episodes }: { episodes: Episode[] }) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {episodes.map((episode) => (
        <li key={episode.id}>
          <EpisodeCard episode={episode} />
        </li>
      ))}
    </ul>
  );
}
