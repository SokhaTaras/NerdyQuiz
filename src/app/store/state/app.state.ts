import { RouterReducerState } from '@ngrx/router-store';
import { initialQuizState, QuizState } from './quiz.state';

export interface AppState {
  router?: RouterReducerState;
  quizzes: QuizState;
}

export const initialAppState: AppState = {
  quizzes: initialQuizState
};

export function getInitialState(): AppState {
  return initialAppState;
}
