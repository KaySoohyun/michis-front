export interface Cat {
  id: string;
  name: string;
  slotNumber: number;
  species: string;
  personality: string;
  hunger: number;
  energy: number;
  happiness: number;
  cleanliness: number;
  level: number;
  experience: number;
  equippedItems: string[];
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CatStatus {
  isHungry: boolean;
  isTired: boolean;
  isSad: boolean;
  isDirty: boolean;
  isCritical: boolean;
}

export interface CreateCatRequest {
  name: string;
  slotNumber: number;
  species?: string;
  personality?: string;
}

export interface CatActionResponse {
  cat: Cat;
  message?: string;
}

export interface FeedResponse extends CatActionResponse {
  consumedItem?: string;
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
