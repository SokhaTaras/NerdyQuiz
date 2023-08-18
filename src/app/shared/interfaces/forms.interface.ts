import { FormControl, FormGroup } from '@angular/forms';

export interface InitQuizForm {
  title: FormControl<string | null>;
  theme: FormControl<string | null>;
}

export interface QuestionForm {
  title: FormControl<string | null>;
  type: FormControl<string | null>;
  difficulty: FormControl<string | null>;
  correctAnswer: FormControl<string | null>;
  correctBooleanAnswer: FormControl<boolean | null>;
  booleanVariants: FormGroup<BooleanQuestionForm>;
  multipleVariants: FormGroup<MultipleQuestionForm>;
}

export interface BooleanQuestionForm {
  variant1: FormControl<boolean | null>;
  variant2: FormControl<boolean | null>;
}

export interface MultipleQuestionForm {
  variant1: FormControl<string | null>;
  variant2: FormControl<string | null>;
  variant3: FormControl<string | null>;
}
