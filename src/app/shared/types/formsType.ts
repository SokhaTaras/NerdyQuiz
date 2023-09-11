import { FormControl, FormGroup } from '@angular/forms';

export type AnswersFormType = FormGroup<{
  text: FormControl<string | null>;
  isCorrect: FormControl<boolean | null>;
}>;

export type Difficulties = {
  Easy: number;
  Medium: number;
  Hard: number;
};
