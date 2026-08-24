export interface KittenProfile {
  id: string;
  name: string;
  species: string;
  description: string;
  personality: string;
  lore: string;
  imageName: string | null;
  imageUrl: string | null;
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
