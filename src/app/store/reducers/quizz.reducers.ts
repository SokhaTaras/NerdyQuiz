import { initialQuizState, QuizState } from '../state/quiz.state';
import { QuizActions } from '../actions/quizz.actions';

export const quizReducers = (
  state = initialQuizState,
  action: QuizActions
): QuizState => {
  switch (action) {
    case QuizActions.GetQuizzesSuccess:
      return {
        ...state,
        quizzes: state.quizzes
      };
    case QuizActions.GetQuizSuccess:
      return {
        ...state,
        selectedQuiz: state.selectedQuiz
      };
    default:
      return state;
  }
};
