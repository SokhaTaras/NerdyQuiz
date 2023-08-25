import { FormArray, FormControl } from '@angular/forms';

import { AnswersFormType } from '../types/forms.type ts';

export interface InitQuizForm {
  title: FormControl<string>;
  theme: FormControl<string>;
}

export interface BooleanQuestionForm {
  title: FormControl<string>;
  type: FormControl<string>;
  difficulty: FormControl<string>;
  correctAnswer: FormControl<string>;
}

export interface MultipleQuestionForm {
  title: FormControl<string>;
  type: FormControl<string>;
  difficulty: FormControl<string>;
  answers: FormArray<AnswersFormType>;
}
