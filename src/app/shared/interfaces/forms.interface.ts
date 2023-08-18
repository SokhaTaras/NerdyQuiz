import { FormControl } from '@angular/forms';

export interface InitQuizForm {
  title: FormControl<string | null>;
  theme: FormControl<string | null>;
}

export interface QuestionForm {
  title: FormControl<string | null>;
  type: FormControl<string | null>;
  variants: FormControl<string[] | boolean[] | null>;
  difficulty: FormControl<string | null>;
  correctAnswer: FormControl<string | null>;
}
