import { createSelector } from '@ngrx/store';

import { AppState } from '../state/app.state';
import { QuizState } from '../state/quiz.state';

const selectQuizzes = (state: AppState) => state.quizzes;

export const selectQuizzesList = createSelector(
  selectQuizzes,
  (state: QuizState) => state.quizzes
);

export const selectSelectedQuiz = createSelector(
  selectQuizzes,
  (state: QuizState) => state.selectedQuiz
);

//todo delete
export const selectState = createSelector(
  selectQuizzes,
  (state: QuizState) => state
);
