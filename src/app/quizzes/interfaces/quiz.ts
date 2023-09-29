import { DropDownItem, Question } from '@a-questions/interfaces/question';

export interface Quiz {
  title?: string;
  difficulty?: DropDownItem;
  theme?: string;
  type?: string;
  id?: string;
  questions?: Question[];
}

export interface QuizCard {
  title: string;
  questions: Question[];
  difficulty: DropDownItem;
  id: string;
}

export enum QUIZ_DIFFICULTY {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard'
}
