import {
  DropDownItem,
  Question,
  RadioButtonItem
} from '@a-questions/interfaces/question';

export interface Quiz {
  title?: string;
  difficulty?: RadioButtonItem;
  category?: DropDownItem;
  type?: string;
  id?: string;
  questions?: Question[];
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
