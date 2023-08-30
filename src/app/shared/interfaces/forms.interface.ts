import { FormArray, FormControl } from '@angular/forms';

import { AnswersFormType } from '../types/forms.type';

export interface InitQuizForm {
  title: FormControl<string>;
  theme: FormControl<string>;
}

export interface QuestionForm {
  title: FormControl<string>;
  type: FormControl<string>;
  difficulty: FormControl<string>;
  answers: FormArray<AnswersFormType>;
}
