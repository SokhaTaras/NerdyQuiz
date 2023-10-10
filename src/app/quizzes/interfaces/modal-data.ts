import { Quiz } from '@a-quizzes/interfaces/quiz';
import { Question } from '@a-questions/interfaces/question';

export interface CreateQuizModalData {
  quiz?: Quiz;
  label: string;
  buttonText: string;
  modalWidth?: string;
  modalHeight?: string;
}

export interface CreateQuestionModalData {
  question?: Question;
  currentQuiz?: Quiz;
  label: string;
  buttonText: string;
  modalWidth?: string;
  modalHeight?: string;
}

export interface ConfirmationModalData {
  text: string;
}
