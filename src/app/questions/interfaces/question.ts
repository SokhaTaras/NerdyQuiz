import {
  QUESTION_DIFFICULTY,
  QUESTION_TYPE
} from '../../shared/enums/question-info';

export interface Question {
  title?: string;
  type?: QUESTION_TYPE;
  difficulty?: QUESTION_DIFFICULTY;
  id?: string;
  answers?: Answer[];
}

export interface Answer {
  text: string;
  isCorrect: boolean;
}

export interface DropDownItem {
  value: string;
  text: string;
}

export interface DifficultyRange {
  Easy: { min: number; max: number };
  Medium: { min: number; max: number };
  Hard: { min: number; max: number };
}
