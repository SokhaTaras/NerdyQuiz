import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Quiz } from '../../interfaces/quiz';
import { StorageError } from '../../../shared/classes/storageError/storage-error';
import { STORAGE_ERROR_MESSAGE } from '../../../shared/enums/storageErrorMessage';
import { Question } from '../../../questions/interfaces/question';
import { LocalStorageService } from '../../../shared/services/local-storage/local-storage.service';
import { getNewQuestionId, getNewQuizId } from '../../../shared/utils/getId';
import { StorageKey } from '../../../shared/enums/storageKey';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  public quizzes$ = new BehaviorSubject<Quiz[]>([]);

  constructor(private localStorageService: LocalStorageService) {}

  addQuiz(quiz: Quiz): Quiz {
    if (quiz) {
      quiz.id = getNewQuizId();
      this.quizzes$.next([...this.quizzes$.value, quiz]);
      this.localStorageService.updateLocalStorage(
        StorageKey.QUIZZES,
        this.quizzes$.value
      );
      return quiz;
    }
    return null;
  }

  editQuiz(quizId: string | undefined, data: Quiz): Quiz {
    const currentQuizzes = [...this.quizzes$.value];
    const quizIndex = currentQuizzes.findIndex((q) => q.id === quizId);

    if (quizIndex !== -1) {
      currentQuizzes[quizIndex].title = data.title;
      currentQuizzes[quizIndex].theme = data.theme;
      this.quizzes$.next(currentQuizzes);
      this.localStorageService.updateLocalStorage(
        StorageKey.QUIZZES,
        this.quizzes$.value
      );

      return data;
    }
    return data;
  }

  getQuizById(id: string): Quiz | undefined {
    return this.quizzes$.value.find((q) => q.id == id);
  }

  initAllQuizzes(key: string): void {
    try {
      let allQuizzes: string =
        this.localStorageService.getLocalStorageData(key);
      if (allQuizzes !== null) {
        this.localStorageService.setLocalStorageData(key, allQuizzes);
        this.quizzes$.next(JSON.parse(allQuizzes));
      }
    } catch (error) {
      throw new StorageError(STORAGE_ERROR_MESSAGE.PARSE);
    }
  }

  addQuestion(quizId: string | null, question: Question): void {
    if (this.quizzes$.value) {
      const currentQuizzes = [...this.quizzes$.value];
      const quizIndex = currentQuizzes.findIndex((q) => q.id === quizId);

      if (quizIndex !== -1) {
        question.id = getNewQuestionId();
        currentQuizzes[quizIndex].questions.push(question);
        this.quizzes$.next(currentQuizzes);
        this.localStorageService.updateLocalStorage(
          StorageKey.QUIZZES,
          this.quizzes$.value
        );
      }
    }
  }

  getQuizQuestions(quizId: string | null): Question[] {
    const currentQuiz = this.getQuizById(quizId);

    if (!currentQuiz || !currentQuiz.questions) {
      return [];
    }

    return [...currentQuiz.questions];
  }

  deleteQuestion(
    quizId: string | undefined,
    questionIndex: number | undefined
  ): void {
    const currentQuizzes = this.quizzes$.value;
    const quizIndex = currentQuizzes.findIndex((q) => q.id === quizId);
    const currentQuiz = currentQuizzes[quizIndex];

    if (quizIndex !== -1) {
      const updatedQuestions = [...currentQuiz.questions];
      updatedQuestions.splice(questionIndex, 1);

      currentQuiz.questions = updatedQuestions;

      this.quizzes$.next(currentQuizzes);
      this.localStorageService.updateLocalStorage(
        StorageKey.QUIZZES,
        this.quizzes$.value
      );
    }
  }
}
