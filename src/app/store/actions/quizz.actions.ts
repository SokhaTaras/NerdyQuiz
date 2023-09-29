import { createAction, props } from '@ngrx/store';

import { Quiz, QuizCard } from '@a-quizzes/interfaces/quiz';

export enum QuizActions {
  GetQuizzes = '[Quiz] Get Quizzes',
  GetQuizzesSuccess = '[Quiz] Get Quizzes Success',
  GetQuiz = '[Quiz] Get Quiz',
  GetQuizSuccess = '[Quiz] Get Quiz Success',
  DeleteQuiz = '[Quiz] Delete Quiz',
  DeleteQuizSuccess = '[Quiz] Delete Quiz Success'
}

export const GetQuizzes = createAction(QuizActions.GetQuizzes);

export const GetQuizzesSuccess = createAction(
  QuizActions.GetQuizzesSuccess,
  props<{ cardQuizzes: QuizCard[] }>()
);

export const GetQuiz = createAction(
  QuizActions.GetQuiz,
  props<{ quizId: string }>()
);

export const GetQuizSuccess = createAction(
  QuizActions.GetQuizSuccess,
  props<{ quiz: Quiz }>()
);

export const DeleteQuiz = createAction(
  QuizActions.DeleteQuiz,
  props<{ quizToDelete: Quiz }>()
);

export const DeleteQuizSuccess = createAction(
  QuizActions.DeleteQuizSuccess,
  props<{ quizToDelete: Quiz }>()
);
