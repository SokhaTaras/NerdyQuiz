import { createReducer, on } from '@ngrx/store';
import { initialQuizState, QuizState } from '../state/quiz.state';
import {
  GetQuizSuccess,
  GetCardQuizzesSuccess,
  DeleteQuizSuccess,
  GetQuizzesSuccess,
  AddQuizSuccess,
  EditQuizSuccess
} from '../actions/quizz.actions';

const initialState: QuizState = initialQuizState;

export const quizReducers = createReducer(
  initialState,
  on(GetCardQuizzesSuccess, (state, action) => ({
    ...state,
    quizzesCard: [...action.cardQuizzes]
  })),
  on(GetQuizSuccess, (state, { quiz }) => ({
    ...state,
    selectedQuiz: quiz
  })),
  on(DeleteQuizSuccess, (state, { quizToDelete }) => ({
    ...state,
    quizzesCard: state.quizzesCard.filter((q) => q.id !== quizToDelete.id)
  })),
  on(AddQuizSuccess, (state, { quiz }) => ({
    ...state,
    quizzes: [...state.quizzes, quiz]
  })),
  on(GetQuizzesSuccess, (state, action) => ({
    ...state,
    quizzes: [...action.quizzes]
  })),
  on(EditQuizSuccess, (state, { quizId, quiz }) => ({
    ...state,
    selectedQuiz: quizId === state.selectedQuiz.id ? quiz : state.selectedQuiz,
    quizzes: { ...state.quizzes, [quizId]: quiz }
  }))
);
