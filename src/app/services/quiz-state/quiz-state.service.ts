import { Injectable } from '@angular/core';
import { IQuiz } from '../../interfaces/quiz.interface';
import { IInitialQuiz } from '../../interfaces/initial-quiz.interface';

@Injectable({
  providedIn: 'root',
})
export class QuizStateService {
  addQuiz(name: string, body: IQuiz[] | undefined): void {
    localStorage.setItem(name, JSON.stringify(body));
  }

  getOneQuiz(name: string): IQuiz | undefined {
    let item = localStorage.getItem(name);
    if (item !== null) {
      return JSON.parse(item);
    }
    return undefined;
  }

  getAllQuizzes(name: string): IQuiz[] | undefined {
    let allQuizzes = localStorage.getItem(name);
    if (allQuizzes !== null) {
      return JSON.parse(allQuizzes);
    }
    return undefined;
  }
  addInitialQuiz(key: string, quiz: IInitialQuiz): void {
    if (quiz !== null) {
      localStorage.setItem(key, JSON.stringify(quiz));
    }
  }

  getInitialQuiz(key: string): IInitialQuiz | undefined {
    let initialQuiz = localStorage.getItem(key);
    if (initialQuiz !== null) {
      return JSON.parse(initialQuiz);
    }
    return undefined;
  }
}
