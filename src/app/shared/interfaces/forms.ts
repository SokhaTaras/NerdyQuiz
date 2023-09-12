import { FormArray, FormControl } from '@angular/forms';

import { AnswersFormType } from '../types/formsType';
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
