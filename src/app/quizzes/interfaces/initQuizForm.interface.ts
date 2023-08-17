import { FormControl } from '@angular/forms';

export interface InitQuizForm {
  title: FormControl<string | null>;
  theme: FormControl<string | null>;
}
