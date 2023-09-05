import { QUESTION_BOOLEAN } from '../../shared/enums/question-info';

export interface Question {
  title?: string;
  type?: string;
  difficulty?: string;
  id?: string;
  answers?: Answer[];
}

export interface Answer {
  text: string;
  isCorrect: boolean;
}

export interface AnswerEntry {
  lang: string;
  text: string;
}

export interface AnswerList {
  value: string;
  translations: { lang: string; text: string }[];
}
