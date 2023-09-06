import { FormArray, FormControl } from '@angular/forms';

import { AnswersFormType } from '../../shared/types/formsType';

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

export interface AnswerList {
  value: string;
  translations: { lang: string; text: string }[];
}

export interface CommonProperties {
  answersControl: AnswersFormType[];
  titleControl: FormControl;
  typeControl: FormControl;
  difficultyControl: FormControl;
  answersFormArray: FormArray;
  answerLength?: number;
}
