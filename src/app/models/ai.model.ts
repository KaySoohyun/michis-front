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
  triviaId: string;
  question: string;
  options: string[];
  difficulty: string;
  category: string;
  rewardCoins: number;
}

export interface AnswerTriviaRequest {
  triviaId: string;
  answer: string;
}

export interface AnswerTriviaResponse {
  wasCorrect: boolean;
  correctAnswer: string;
  explanation: string | null;
  rewardEarned: number;
}
