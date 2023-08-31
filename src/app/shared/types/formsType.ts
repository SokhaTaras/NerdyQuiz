import { FormControl, FormGroup } from '@angular/forms';

export type AnswersFormType = FormGroup<{
  text: FormControl<string | null>;
  isCorrect: FormControl<boolean | null>;
}>;
