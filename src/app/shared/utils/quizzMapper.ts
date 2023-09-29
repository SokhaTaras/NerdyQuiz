import { Quiz, QuizCard } from '@a-quizzes/interfaces/quiz';
import { defaultDifficulty } from '@a-questions/constants/dropdowns';

export function mapQuizToQuizCard(quiz: Quiz): QuizCard {
  return {
    title: quiz.title || '',
    questions: quiz.questions,
    difficulty: quiz.difficulty || defaultDifficulty,
    id: quiz.id || ''
  };
}
