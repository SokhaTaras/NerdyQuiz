import { QuestionType } from '../../shared/enums/questionTypes';

export interface Question {
  title?: string;
  type?: QuestionType;
  difficulty?: string;
  id?: string;
  answers?: Answer[];
}

export interface Answer {
  text: string;
  isCorrect: boolean;
}

export interface DifficultyRange {
  Easy: { min: number; max: number };
  Medium: { min: number; max: number };
  Hard: { min: number; max: number };
}
