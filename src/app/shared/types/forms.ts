import { FormArray, FormControl, FormGroup } from '@angular/forms';

import {
  QUESTION_DIFFICULTY,
  QUESTION_TYPE
} from '@a-shared/enums/question-info';
import { QUIZ_DIFFICULTY } from '@a-quizzes/interfaces/quiz';

export interface InitQuizForm {
  title: FormControl<string>;
  theme: FormControl<string>;
  difficulty: FormControl<QUIZ_DIFFICULTY>;
}

export interface QuestionForm {
  title: FormControl<string>;
  type: FormControl<QUESTION_TYPE>;
  answers: FormArray<AnswersFormType>;
}

export type AnswersFormType = FormGroup<{
  text: FormControl<string | null>;
  isCorrect: FormControl<boolean | null>;
}>;

export interface Difficulties {
  [key: string]: number;
}
