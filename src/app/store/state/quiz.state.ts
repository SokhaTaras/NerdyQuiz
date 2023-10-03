import { Quiz } from '@a-quizzes/interfaces/quiz';

export interface QuizState {
  quizzes: Quiz[];
  selectedQuiz: Quiz;
}

export const initialQuizState: QuizState = {
  quizzes: null,
  selectedQuiz: null
};
