import { Injectable } from '@angular/core';
import { Quiz } from '../../interfaces/quiz.interface';
import { InitialQuiz } from '../../interfaces/initial-quiz.interface';
import { StorageError } from '../../classes/storageError/storage-error';
import { StorageErrorMessage } from '../../enums/storageErrorMessage';

@Injectable({
  providedIn: 'root',
})
export class QuizStateService {
  addQuiz(name: string, body: Quiz[] | undefined): void {
    try {
      localStorage.setItem(name, JSON.stringify(body));
    } catch (error) {
      new StorageError(StorageErrorMessage.stringify);
    }
  }
  getOneQuiz(name: string): Quiz | undefined {
    try {
      let item = localStorage.getItem(name);
      if (item !== null) {
        return JSON.parse(item);
      }
    } catch (error) {
      new StorageError(StorageErrorMessage.parse);
    }
    return undefined;
  }
  getAllQuizzes(name: string): Quiz[] | undefined {
    try {
      let allQuizzes = localStorage.getItem(name);
      if (allQuizzes !== null) {
        return JSON.parse(allQuizzes);
      }
    } catch (error) {
      new StorageError(StorageErrorMessage.parse);
    }
    return undefined;
  }
  addInitialQuiz(key: string, quiz: InitialQuiz): void {
    try {
      if (quiz !== null) {
        localStorage.setItem(key, JSON.stringify(quiz));
      }
    } catch (error) {
      new StorageError(StorageErrorMessage.stringify);
    }
  }
  getInitialQuiz(key: string): InitialQuiz | undefined {
    try {
      let initialQuiz = localStorage.getItem(key);
      if (initialQuiz !== null) {
        return JSON.parse(initialQuiz);
      }
    } catch (error) {
      new StorageError(StorageErrorMessage.parse);
    }
    return undefined;
  }
}
