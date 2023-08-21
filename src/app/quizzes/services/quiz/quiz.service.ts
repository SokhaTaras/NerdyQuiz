import { Injectable } from '@angular/core';
import { Quiz } from '../../interfaces/quiz.interface';
import { StorageError } from '../../../shared/classes/storageError/storage-error';
import { StorageErrorMessage } from '../../../shared/enums/storageErrorMessage';
import { BehaviorSubject } from 'rxjs';
import { StorageKey } from '../../../shared/enums/storageKey';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  public quizzes$ = new BehaviorSubject<Quiz[]>([]);

  constructor() {}

  addQuiz(key: string, quiz: Quiz): void {
    try {
      if (quiz !== null) {
        this.quizzes$.next([...this.quizzes$.value, quiz]);
        localStorage.setItem(key, JSON.stringify(this.quizzes$.value));
      }
    } catch (error) {
      throw new StorageError(StorageErrorMessage.stringify);
    }
  }

  editQuiz(quizId: string | undefined, data: Quiz): void {
    const currentQuizzes = [...this.quizzes$.value];
    const quizIndex = currentQuizzes.findIndex((q) => q.id === quizId);
    console.log(quizIndex);

    if (quizIndex !== -1) {
      currentQuizzes[quizIndex].title = data.title;
      currentQuizzes[quizIndex].type = data.type;
      console.log('currQuiz after', currentQuizzes[quizIndex]);
      this.quizzes$.next(currentQuizzes);
      this.updateLocalStorage();
    }
  }

  getQuizById(id: string | undefined): Quiz | undefined {
    return this.quizzes$.value.find((q) => q.id == id);
  }

  initAllQuizzes(key: string): void {
    try {
      let allQuizzes: string | null = localStorage.getItem(key);
      if (allQuizzes !== null) {
        localStorage.setItem(key, allQuizzes);
        this.quizzes$.next(JSON.parse(allQuizzes));
      }
    } catch (error) {
      throw new StorageError(StorageErrorMessage.parse);
    }
  }

  getNewQuizId(): string {
    const decimalSystem = 10;
    return new Date().getTime().toString(decimalSystem);
  }

  private updateLocalStorage(): void {
    try {
      localStorage.setItem(
        StorageKey.QUIZZES,
        JSON.stringify(this.quizzes$.value)
      );
    } catch (error) {
      throw new StorageError(StorageErrorMessage.stringify);
    }
  }
}
