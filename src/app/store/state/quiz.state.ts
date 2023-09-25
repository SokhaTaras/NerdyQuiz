import { Quiz, QuizCard } from '@a-quizzes/interfaces/quiz';

export interface QuizState {
  quizzes: QuizCard[];
  selectedQuiz: Quiz;
}

export const initialQuizState: QuizState = {
  quizzes: null,
  selectedQuiz: null
};
