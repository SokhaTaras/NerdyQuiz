import { Question } from '@a-questions/interfaces/question';

export interface Quiz {
  title?: string;
  difficulty?: QUIZ_DIFFICULTY;
  theme?: string;
  type?: string;
  id?: string;
  questions?: Question[];
}

export interface QuizCard {
  title: string;
  questions: Question[];
  difficulty: QUIZ_DIFFICULTY;
  id: string;
}

export enum QUIZ_DIFFICULTY {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard'
}
