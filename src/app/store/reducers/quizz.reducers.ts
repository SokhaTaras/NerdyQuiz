import { createReducer, on } from '@ngrx/store';

import { initialQuizState, QuizState } from '../state/quiz.state';
import { GetQuizSuccess, GetQuizzesSuccess } from '../actions/quizz.actions';

const initialState: QuizState = initialQuizState;

export const quizReducers = createReducer(
  initialState,
  on(GetQuizzesSuccess, (state, action) => ({
    ...state,
    quizzes: [...action.cardQuizzes]
  })),
  on(GetQuizSuccess, (state, { quiz }) => ({
    ...state,
    selectedQuiz: quiz
  }))
);
