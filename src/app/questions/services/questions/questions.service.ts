import { Injectable } from '@angular/core';

import { QuizService } from '../../../quizzes/services/quiz/quiz.service';

import { Question } from '../../interfaces/question.interface';
import { StorageError } from '../../../shared/classes/storageError/storage-error';
import { StorageErrorMessage } from '../../../shared/enums/storageErrorMessage';
import { StorageKey } from '../../../shared/enums/storageKey';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  constructor(private quizService: QuizService) {}

  addQuestion(quizId: string, question: Question): void {
    const currentQuizzes = [...this.quizService.quizzes$.value];
    const quizIndex = currentQuizzes.findIndex((q) => q.id === quizId);

    if (quizIndex !== -1) {
      currentQuizzes[quizIndex].questions.push(question);
      this.quizService.quizzes$.next(currentQuizzes);
      this.updateLocalStorage();
    }
  }

  getQuizQuestions(quizId: string): Question[] | undefined {
    const currentQuiz = this.quizService.getQuizById(quizId);
    const questions: Question[] | undefined = currentQuiz?.questions;
    return questions;
  }

  deleteQuestion(
    quizId: string | undefined,
    questionIndex: number | undefined
  ): void {
    const currentQuizzes = [...this.quizService.quizzes$.value];
    const quizIndex = currentQuizzes.findIndex((q) => q.id === quizId);

    if (quizIndex !== -1) {
      currentQuizzes[quizIndex].questions.splice(questionIndex as number, 1);
      this.quizService.quizzes$.next(currentQuizzes);
      this.updateLocalStorage();
    }
  }

  getNewQuestionId(): string {
    const hexadecimalSystem = 16;
    return new Date().getTime().toString(hexadecimalSystem);
  }

  private updateLocalStorage(): void {
    try {
      localStorage.setItem(
        StorageKey.QUIZZES,
        JSON.stringify(this.quizService.quizzes$.value)
      );
    } catch (error) {
      throw new StorageError(StorageErrorMessage.stringify);
    }
  }
}
