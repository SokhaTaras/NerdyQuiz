import { createReducer, on } from '@ngrx/store';
import { initialQuizState, QuizState } from '../state/quiz.state';
import {
  GetQuizSuccess,
  DeleteQuizSuccess,
  GetQuizzesSuccess,
  AddQuizSuccess,
  EditQuizSuccess
} from '../actions/quizz.actions';

const initialState: QuizState = initialQuizState;

export const quizReducers = createReducer(
  initialState,
  on(GetQuizSuccess, (state, { quiz }) => ({
    ...state,
    selectedQuiz: quiz
  })),
  on(GetQuizzesSuccess, (state, action) => ({
    ...state,
    quizzes: [...action.quizzes]
  })),
  on(DeleteQuizSuccess, (state, { quizToDelete }) => ({
    ...state,
    quizzes: state.quizzes.filter((q) => q.id !== quizToDelete.id)
  })),
  on(AddQuizSuccess, (state, { quiz }) => ({
    ...state,
    quizzes: [...state.quizzes, quiz]
  })),
  on(EditQuizSuccess, (state, { quizId, quiz }) => ({
    ...state,
    selectedQuiz: quizId === state.selectedQuiz.id ? quiz : state.selectedQuiz,
    quizzes: { ...state.quizzes, [quizId]: quiz }
  }))
);
