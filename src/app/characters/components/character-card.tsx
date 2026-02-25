import Image from "next/image";
import type { Character } from "@/types/rick-and-morty";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

function getStatusBadgeVariant(
  status: Character["status"],
): "default" | "secondary" | "destructive" {
  if (status === "Dead") return "destructive";
  if (status === "Alive") return "default";
  return "secondary";
}

export function CharacterCard({
  character,
  isSelected,
  onClick,
}: {
  character: Character;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <Card
      className={cn(
        "group overflow-hidden transition-colors",
        "cursor-pointer select-none hover:border-primary/60",
        isSelected && "border-primary ring-1 ring-primary/30",
      )}
      onClick={onClick}
    >
      <div className="relative aspect-square w-full bg-muted">
        <Image
          alt={character.name}
          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          fill
          priority={false}
          sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
          src={character.image}
        />
        <div className="absolute left-3 top-3">
          <Badge variant={getStatusBadgeVariant(character.status)}>{character.status}</Badge>
        </div>
        {isSelected ? (
          <div className="absolute right-3 top-3 rounded-md bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
            Selected
          </div>
        ) : null}
      </div>

      <CardContent className="space-y-1.5 p-4">
        <div className="line-clamp-1 text-base font-semibold tracking-tight">{character.name}</div>
        <div className="text-sm text-muted-foreground">
          {character.gender} • {character.species}
        </div>
      </CardContent>
    </Card>
  );
}
