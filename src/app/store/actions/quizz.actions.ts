import { createAction, props } from '@ngrx/store';

import { Quiz, QUIZ_DIFFICULTY } from '@a-quizzes/interfaces/quiz';

export enum QuizActions {
  GetQuizzes = '[Quiz] Get Quizzes',
  GetQuizzesSuccess = '[Quiz] Get Quizzes Success',
  GetQuiz = '[Quiz] Get Quiz',
  GetQuizSuccess = '[Quiz] Get Quiz Success'
}

export const GetQuizzes = createAction(QuizActions.GetQuizzes);

export const GetQuizzesSuccess = createAction(
  QuizActions.GetQuizzesSuccess,
  props<{
    title: string;
    questionsAmount: number;
    difficulty: QUIZ_DIFFICULTY;
  }>()
);

export const GetQuiz = createAction(
  QuizActions.GetQuiz,
  props<{ quizId: string }>()
);

export const GetQuizSuccess = createAction(
  QuizActions.GetQuizSuccess,
  props<{ quiz: Quiz }>()
);
