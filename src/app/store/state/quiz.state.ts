import { Quiz, QuizCard } from '@a-quizzes/interfaces/quiz';

export interface QuizState {
  quizzes: Quiz[];
  quizzesCard: QuizCard[];
  selectedQuiz: Quiz;
}

export const initialQuizState: QuizState = {
  quizzes: null,
  quizzesCard: null,
  selectedQuiz: null
};
