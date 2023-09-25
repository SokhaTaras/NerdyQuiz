import { initialQuizState, QuizState } from './quiz.state';

export interface AppState {
  quizzes: QuizState;
}

export const initialAppState: AppState = {
  quizzes: initialQuizState
};

export function getInitialState(): AppState {
  return initialAppState;
}
