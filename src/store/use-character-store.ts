import { create } from "zustand";

interface CharacterStoreState {
  selectedCharacterIds: ReadonlySet<number>;

  activeCharacterId: number | null;

  actions: {
    select: (characterId: number) => void;
    deselect: (characterId: number) => void;
    toggleSelected: (characterId: number) => void;
    setActiveCharacter: (characterId: number | null) => void;
  };
}

export const useCharacterStore = create<CharacterStoreState>((set, get) => ({
  selectedCharacterIds: new Set<number>(),

  activeCharacterId: null,

  actions: {
    select: (characterId) =>
      set((state) => {
        if (state.selectedCharacterIds.has(characterId)) return state;
        const next = new Set(state.selectedCharacterIds);
        next.add(characterId);
        return { selectedCharacterIds: next };
      }),

    deselect: (characterId) =>
      set((state) => {
        if (!state.selectedCharacterIds.has(characterId)) return state;
        const next = new Set(state.selectedCharacterIds);
        next.delete(characterId);
        return { selectedCharacterIds: next };
      }),

    toggleSelected: (characterId) =>
      set((state) => {
        const next = new Set(state.selectedCharacterIds);
        if (next.has(characterId)) next.delete(characterId);
        else next.add(characterId);
        return { selectedCharacterIds: next };
      }),

    setActiveCharacter: (characterId) => {
      const prev = get().activeCharacterId;
      if (prev === characterId) return;
      set({ activeCharacterId: characterId });
    },
  },
}));
