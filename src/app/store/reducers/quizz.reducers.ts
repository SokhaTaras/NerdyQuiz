import { createReducer, on } from '@ngrx/store';
import { initialQuizState, QuizState } from '../state/quiz.state';
import {
  GetQuizSuccess,
  DeleteQuizSuccess,
  GetQuizzesSuccess,
  AddQuizSuccess,
  EditQuizSuccess,
  AddQuestionSuccess,
  DeleteQuestionSuccess
} from '../actions/quizz.actions';

const initialState: QuizState = initialQuizState;

export const quizReducers = createReducer(
  initialState,

  on(GetQuizSuccess, (state, action) => {
    const selectedQuiz = action?.quiz;
    return {
      ...state,
      selectedQuiz: selectedQuiz
    };
  }),

  on(GetQuizzesSuccess, (state, action) => {
    const quizzes = [...action?.quizzes];
    return {
      ...state,
      quizzes: quizzes
    };
  }),

  on(DeleteQuizSuccess, (state, action) => {
    const quiz = action?.quiz;
    const newQuizzes = state.quizzes.filter(
      (currentQuiz) => currentQuiz?.id !== quiz?.id
    );

    return {
      ...state,
      quizzes: newQuizzes
    };
  }),

  on(AddQuizSuccess, (state, action) => {
    const quiz = action?.quiz;
    const newQuizzes = [...state.quizzes, quiz];
    return {
      ...state,
      quizzes: newQuizzes
    };
  }),

  on(EditQuizSuccess, (state, action) => {
    const quiz = action?.quiz;
    const quizId = action?.quizId;

    const selectedQuizIndex = state.quizzes.findIndex(
      (quiz) => quiz.id === state.selectedQuiz.id
    );
    if (selectedQuizIndex === -1) {
      return state;
    }

    const newSelectedQuiz =
      quizId === state.selectedQuiz?.id ? quiz : state.selectedQuiz;

    const newQuizzes = [...state.quizzes];

    newQuizzes.splice(selectedQuizIndex, 1, quiz);

    return {
      ...state,
      selectedQuiz: newSelectedQuiz,
      quizzes: newQuizzes
    };
  }),

  on(AddQuestionSuccess, (state, action) => {
    const question = action?.question;
    const selectedQuizIndex = state.quizzes.findIndex(
      (quiz) => quiz.id === state.selectedQuiz?.id
    );

    if (selectedQuizIndex === -1) {
      return state;
    }

    const updatedQuestions = [...state.selectedQuiz?.questions, question];

    const updatedSelectedQuiz = {
      ...state.selectedQuiz,
      questions: updatedQuestions
    };

    const updatedQuizzes = [...state.quizzes];

    updatedQuizzes.splice(selectedQuizIndex, 1, updatedSelectedQuiz);

    return {
      ...state,
      selectedQuiz: updatedSelectedQuiz,
      quizzes: updatedQuizzes
    };
  }),

  on(DeleteQuestionSuccess, (state, action) => {
    const question = action?.question;

    const updatedQuestions = state.selectedQuiz.questions.filter(
      (quest) => quest?.id !== question?.id
    );
    const updatedSelectedQuiz = {
      ...state.selectedQuiz,
      questions: updatedQuestions
    };

    const updatedQuizzes = [...state.quizzes];

    const selectedQuizIndex = updatedQuizzes.findIndex(
      (quiz) => quiz.id === state.selectedQuiz.id
    );
    if (selectedQuizIndex !== -1) {
      updatedQuizzes[selectedQuizIndex] = updatedSelectedQuiz;
    }

    return {
      ...state,
      selectedQuiz: updatedSelectedQuiz,
      quizzes: updatedQuizzes
    };
  })
);
