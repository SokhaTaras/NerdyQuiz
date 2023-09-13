import { FormArray, FormControl, FormGroup } from '@angular/forms';

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

export type AnswersFormType = FormGroup<{
  text: FormControl<string | null>;
  isCorrect: FormControl<boolean | null>;
}>;

export type Difficulties = {
  Easy: number;
  Medium: number;
  Hard: number;
};
