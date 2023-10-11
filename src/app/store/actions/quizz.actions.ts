import { createAction, props } from '@ngrx/store';

import { Quiz } from '@a-quizzes/interfaces/quiz';
import { Question } from '@a-questions/interfaces/question';

export enum QuizActions {
  GetQuizzes = '[Quiz] Get Quizzes',
  GetQuizzesSuccess = '[Quiz] Get Quizzes Success',
  GetQuiz = '[Quiz] Get Quiz',
  GetQuizSuccess = '[Quiz] Get Quiz Success',
  DeleteQuiz = '[Quiz] Delete Quiz',
  DeleteQuizSuccess = '[Quiz] Delete Quiz Success',
  AddQuiz = '[Quiz] Add Quiz',
  AddQuizSuccess = '[Quiz] Add Quiz Success',
  EditQuiz = '[Quiz] Edit Quiz',
  EditQuizSuccess = '[Quiz] Edit Quiz Success',
  AddQuestion = '[Quiz] Add Question',
  AddQuestionSuccess = '[Quiz] Add Question Success',
  DeleteQuestion = '[Quiz] Delete Question',
  DeleteQuestionSuccess = '[Quiz] Delete Question Success'
}

export const GetQuizzes = createAction(QuizActions.GetQuizzes);

export const GetQuizzesSuccess = createAction(
  QuizActions.GetQuizzesSuccess,
  props<{ quizzes: Quiz[] }>()
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
  props<{ quiz: Quiz }>()
);

export const DeleteQuizSuccess = createAction(
  QuizActions.DeleteQuizSuccess,
  props<{ quiz: Quiz }>()
);

export const AddQuiz = createAction(
  QuizActions.AddQuiz,
  props<{ quiz: Quiz }>()
);

export const AddQuizSuccess = createAction(
  QuizActions.AddQuizSuccess,
  props<{ quiz: Quiz }>()
);

export const EditQuiz = createAction(
  QuizActions.EditQuiz,
  props<{ quizId: string; quiz: Quiz }>()
);

export const EditQuizSuccess = createAction(
  QuizActions.EditQuizSuccess,
  props<{ quizId: string; quiz: Quiz }>()
);

export const AddQuestion = createAction(
  QuizActions.AddQuestion,
  props<{ question: Question; quizId: string }>()
);

export const AddQuestionSuccess = createAction(
  QuizActions.AddQuestionSuccess,
  props<{ question: Question }>()
);

export const DeleteQuestion = createAction(
  QuizActions.DeleteQuestion,
  props<{ question: Question; quizId: string }>()
);

export const DeleteQuestionSuccess = createAction(
  QuizActions.DeleteQuestionSuccess,
  props<{ question: Question }>()
);
