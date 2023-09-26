import { Question } from '@a-questions/interfaces/question';

export interface Quiz {
  title?: string;
  difficulty?: QUIZ_DIFFICULTY;
  category?: string;
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

export interface CategoriesResponse {
  trivia_categories: Category[];
}

export interface Category {
  id: number;
  name: string;
}

export enum QUIZ_DIFFICULTY {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard'
}
