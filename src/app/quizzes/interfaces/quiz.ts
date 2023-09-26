import { Question } from '@a-questions/interfaces/question';
import { QuestionCategoryEnum } from '@a-shared/enums/categories';

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

export interface CategoriesResponse {
  trivia_categories: Category[];
}

export interface Category {
  id: number;
  name: QuestionCategoryEnum;
}

export enum QUIZ_DIFFICULTY {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard'
}
