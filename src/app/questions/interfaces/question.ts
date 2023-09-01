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
