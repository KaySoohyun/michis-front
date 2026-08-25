export interface CatStatus {
  isHungry: boolean;
  isTired: boolean;
  isSad: boolean;
  isDirty: boolean;
  isCritical: boolean;
}

/** Umbrales de estado derivados de los stats (fuente única para store y consola). */
export function deriveCatStatus(cat: Pick<
  Cat,
  'hunger' | 'energy' | 'happiness' | 'cleanliness'
>): CatStatus {
  return {
    isHungry: cat.hunger < 30,
    isTired: cat.energy < 20,
    isSad: cat.happiness < 25,
    isDirty: cat.cleanliness < 30,
    isCritical: cat.hunger < 10 || cat.energy < 10,
  };
}

export interface Cat {
  id: string;
  name: string;
  slotNumber: number;
  species: string;
  personality: string;
  lore: string | null;
  hunger: number;
  energy: number;
  happiness: number;
  cleanliness: number;
  avatarUrl: string | null;
  birthDate: string;
  isAlive: boolean;
  equippedItems: string[];
  lastFedAt: string | null;
  lastPlayedAt: string | null;
  status?: CatStatus;
}

export interface CreateCatRequest {
  name: string;
  slotNumber: number;
  species?: string;
  personality?: string;
  lore?: string;
  avatarUrl?: string;
}

export interface CatActionResponse {
  cat: Cat;
  message?: string;
}

export interface FeedResponse extends CatActionResponse {
  consumedItem?: { id: string; name: string };
}

export interface PlayResponse extends CatActionResponse {
  happinessGained: number;
  energyLost: number;
}

export interface CleanResponse extends CatActionResponse {
  cleanlinessRestored: number;
}

export interface SleepResponse extends CatActionResponse {
  energyRecovered: number;
}

export interface EquipResponse extends CatActionResponse {
  equippedItems: string[];
}
