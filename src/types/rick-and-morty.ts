export interface RickAndMortyApiInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface RickAndMortyApiResponse<T> {
  info: RickAndMortyApiInfo;
  results: T[];
}

export interface RickAndMortyLocationRef {
  name: string;
  url: string;
}

export type CharacterStatus = "Alive" | "Dead" | "unknown";
export type CharacterGender = "Female" | "Male" | "Genderless" | "unknown";

export interface Character {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: CharacterGender;
  origin: RickAndMortyLocationRef;
  location: RickAndMortyLocationRef;
  image: string;
  episode: string[];
  url: string;
  created: string;
}
