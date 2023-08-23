import { FormArray, FormControl, FormGroup } from '@angular/forms';

import { AnswersFormType } from '../types/forms.type ts';

export interface InitQuizForm {
  title: FormControl<string | null>;
  theme: FormControl<string | null>;
}

export interface QuestionForm {
  title: FormControl<string | null>;
  type: FormControl<string | null>;
  difficulty: FormControl<string | null>;
}

export interface BooleanQuestionForm {
  title: FormControl<string | null>;
  type: FormControl<string | null>;
  difficulty: FormControl<string | null>;
  correctBooleanAnswer: FormControl<string | null>;
}

export interface MultipleQuestionForm {
  title: FormControl<string | null>;
  type: FormControl<string | null>;
  difficulty: FormControl<string | null>;
  answers: FormArray<AnswersFormType>;
}
