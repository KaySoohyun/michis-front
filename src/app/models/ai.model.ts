export interface GeneratedCat {
  name: string;
  species: string;
  personality: string;
  lore: string;
  stats: {
    baseHunger: number;
    baseEnergy: number;
    baseHappiness: number;
  };
  appearanceDescription: string;
  suggestedColorPalette: string[];
}

export interface GenerateCatRequest {
  theme?: string;
  difficulty?: 'common' | 'rare' | 'legendary';
}

export interface TriviaQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  rewardCoins: number;
  difficulty: string;
  category: string;
}

export interface AnswerTriviaRequest {
  triviaId: string;
  answer: number;
}

export interface AnswerTriviaResponse {
  correct: boolean;
  correctAnswer: number;
  explanation: string;
  coinsEarned: number;
  totalCoins: number;
}

export interface TriviaHistoryEntry {
  id: string;
  question: string;
  correct: boolean;
  category: string;
  difficulty: string;
  coinsEarned: number;
  answeredAt: string;
}
