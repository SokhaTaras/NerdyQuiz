import { FormArray, FormControl, FormGroup } from '@angular/forms';

import { QUESTION_TYPE } from '@a-shared/enums/question-info';
import {
  DropDownItem,
  RadioButtonItem
} from '@a-questions/interfaces/question';

export interface InitQuizForm {
  title: FormControl<string>;
  category: FormControl<DropDownItem>;
  difficulty: FormControl<RadioButtonItem>;
}

export interface QuestionForm {
  title: FormControl<string>;
  type: FormControl<QUESTION_TYPE>;
  answers: FormArray<AnswersFormType>;
}

export type AnswersFormType = FormGroup<{
  text: FormControl<string | null>;
  isCorrect: FormControl<boolean | null>;
}>;

export interface Difficulties {
  [key: string]: number;
}
