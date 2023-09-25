import { Quiz, QUIZ_DIFFICULTY, QuizCard } from '@a-quizzes/interfaces/quiz';

export function mapQuizToQuizCard(quiz: Quiz): QuizCard {
  return {
    title: quiz.title || '',
    questions: quiz.questions,
    difficulty: quiz.difficulty || QUIZ_DIFFICULTY.EASY,
    id: quiz.id || ''
  };
}
