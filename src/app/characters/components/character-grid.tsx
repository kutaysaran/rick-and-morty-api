import type { Character } from "@/types/rick-and-morty";
import { CharacterCard } from "./character-card";

export function CharacterGrid({
  characters,
  isSelected,
  onToggleSelected,
}: {
  characters: Character[];
  isSelected: (characterId: number) => boolean;
  onToggleSelected: (characterId: number) => void;
}) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {characters.map((character) => (
        <li key={character.id}>
          <CharacterCard
            character={character}
            isSelected={isSelected(character.id)}
            onClick={() => {
              onToggleSelected(character.id);
            }}
          />
        </li>
      ))}
    </ul>
  );
}
