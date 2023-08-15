import { Injectable } from '@angular/core';
import { Quiz } from '../../interfaces/quiz.interface';
import { StorageError } from '../../../shared/classes/storageError/storage-error';
import { StorageErrorMessage } from '../../../shared/enums/storageErrorMessage';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class QuizService {
  public quizzes$ = new BehaviorSubject<Quiz[]>([]);
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
  getOneQuiz(name: string): Quiz | undefined {
    try {
      let item = localStorage.getItem(name);
      if (item !== null) {
        return JSON.parse(item);
      }
    } catch (error) {
      throw new StorageError(StorageErrorMessage.parse);
    }
    return undefined;
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
  geNewQuizId(): string {
    const decimalSystem = 10;
    return new Date().getTime().toString(decimalSystem);
  }
}
