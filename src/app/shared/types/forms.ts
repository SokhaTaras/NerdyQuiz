import { FormArray, FormControl, FormGroup } from '@angular/forms';

import { QUESTION_DIFFICULTY, QUESTION_TYPE } from '../enums/question-info';

export interface InitQuizForm {
  title: FormControl<string>;
  theme: FormControl<string>;
}

export interface QuestionForm {
  title: FormControl<string>;
  type: FormControl<QUESTION_TYPE>;
  difficulty: FormControl<QUESTION_DIFFICULTY>;
  answers: FormArray<AnswersFormType>;
}

export type AnswersFormType = FormGroup<{
  text: FormControl<string | null>;
  isCorrect: FormControl<boolean | null>;
}>;

export interface Difficulties {
  [key: string]: number;
}
