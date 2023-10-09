import { QUESTION_TYPE } from '@a-shared/enums/question-info';
import { LABELS } from '@a-shared/enums/shared-components';

export interface Question {
  title?: string;
  type?: QUESTION_TYPE;
  id?: string;
  answers?: Answer[];
}

export interface QuestionResponse {
  response_code: number;
  results: FetchedQuestion[];
}

export interface FetchedQuestion {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: QUESTION_TYPE;
}

export interface QuestionResult extends Question {
  answer: Answer;
  questionTime: number;
}

export interface QuizResult {
  questionResults: QuestionResult[];
  quizTime: number;
}

export interface Answer {
  text: string;
  isCorrect: boolean;
}

export interface DropDownItem {
  value: string;
  text: string;
}

export interface RadioButtonItem extends DropDownItem {
  type?: LABELS;
  isChecked: boolean;
}

export interface DifficultyRange {
  Easy: { min: number; max: number };
  Medium: { min: number; max: number };
  Hard: { min: number; max: number };
}
