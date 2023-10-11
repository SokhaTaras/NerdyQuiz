import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, map, Observable } from 'rxjs';

import {
  Question,
  QuestionResult,
  QuizResult
} from '@a-questions/interfaces/question';
import { LocalStorageService } from '@a-shared/services/local-storage/local-storage.service';
import { getNewQuestionId } from '@a-shared/utils/getId';
import { StorageKey } from '@a-shared/enums/storageKey';
import { Quiz } from '@a-quizzes/interfaces/quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  quizzes$ = new BehaviorSubject<Quiz[]>([]);
  questionsResults = new BehaviorSubject<QuestionResult[]>([]);

  constructor(private localStorageService: LocalStorageService) {}

  addQuiz(quiz: Quiz): Observable<Quiz> {
    return new Observable<Quiz>((subscriber) => {
      if (quiz) {
        this.quizzes$.next([...this.quizzes$.value, quiz]);
        this.localStorageService.updateLocalStorage(
          StorageKey.QUIZZES,
          this.quizzes$.value
        );
        subscriber.next(quiz);
      } else {
        subscriber.error();
      }
      subscriber.complete();
    });
  }

  editQuiz(quizId: string | undefined, updatedData: Quiz): Observable<Quiz> {
    return new Observable<Quiz>((subscriber) => {
      const currentQuizzes = [...this.quizzes$.value];
      const quizIndex = currentQuizzes.findIndex((q) => q.id === quizId);

      if (quizIndex !== -1) {
        const updatedQuiz = {
          ...currentQuizzes[quizIndex],
          ...updatedData
        };

        currentQuizzes[quizIndex] = updatedQuiz;
        this.quizzes$.next(currentQuizzes);
        this.localStorageService.updateLocalStorage(
          StorageKey.QUIZZES,
          this.quizzes$.value
        );

        subscriber.next(updatedQuiz);
      } else {
        subscriber.error();
      }

      subscriber.complete();
    });
  }

  deleteQuiz(quiz: Quiz): Observable<void> {
    return new Observable<void>((subscriber) => {
      const currentQuizzes = [...this.quizzes$.value];
      const quizIndex = currentQuizzes.findIndex((q) => q.id === quiz.id);

      if (quizIndex !== -1) {
        currentQuizzes.splice(quizIndex, 1);
        this.quizzes$.next(currentQuizzes);
        this.localStorageService.updateLocalStorage(
          StorageKey.QUIZZES,
          currentQuizzes
        );
        subscriber.next();
      } else {
        subscriber.error();
      }
      subscriber.complete();
    });
  }

  getQuizById(id: string): Observable<Quiz> {
    return this.quizzes$.pipe(
      map((quizzes) => quizzes.find((q) => q.id == id))
    );
  }

  initAllQuizzes(key: string): Observable<Quiz[]> {
    let allQuizzes: string = this.localStorageService.getStringifiedData(key);

    if (allQuizzes !== null) {
      this.localStorageService.setLocalStorageData(key, allQuizzes);
      this.quizzes$.next(JSON.parse(allQuizzes));
    } else {
      return new Observable<Quiz[]>((subscriber) => {
        subscriber.next([]);
        subscriber.complete();
      });
    }

    return new Observable<Quiz[]>((subscriber) => {
      subscriber.next(JSON.parse(allQuizzes));
      subscriber.complete();
    }).pipe(delay(1000));
  }

  addQuestion(quizId: string | null, question: Question): Observable<Question> {
    return new Observable<Question>((subscriber) => {
      const currentQuizzes = this.quizzes$.value;
      if (!currentQuizzes) {
        subscriber.error();
        subscriber.complete();
        return;
      }

      const quizIndex = currentQuizzes.findIndex((q) => q.id === quizId);
      if (quizIndex !== -1) {
        question.id = getNewQuestionId();
        const updatedQuizzes = [...currentQuizzes];
        const currentQuiz = updatedQuizzes[quizIndex];

        const updatedQuiz = {
          ...currentQuiz,
          questions: [...currentQuiz.questions, question]
        };

        updatedQuizzes[quizIndex] = updatedQuiz;

        this.quizzes$.next(updatedQuizzes);
        this.localStorageService.updateLocalStorage(
          StorageKey.QUIZZES,
          updatedQuizzes
        );

        subscriber.next(question);
      }

      subscriber.complete();
    });
  }

  getQuizQuestions(quizId: string | null): Observable<Question[]> {
    return this.getQuizById(quizId).pipe(
      map((quiz) => {
        if (!quiz || !quiz.questions) {
          return [];
        }
        return [...quiz.questions];
      })
    );
  }

  deleteQuestion(
    quizId: string | undefined,
    questionIndex: number | undefined
  ): Observable<Question> {
    return new Observable<Question>((subscriber) => {
      const currentQuizzes = this.quizzes$.value;
      const quizIndex = currentQuizzes.findIndex((q) => q.id === quizId);

      if (quizIndex !== -1) {
        const updatedQuizzes = [...currentQuizzes];
        const currentQuiz = { ...updatedQuizzes[quizIndex] };
        const updatedQuestions = [...currentQuiz.questions];

        updatedQuestions.splice(questionIndex, 1);
        currentQuiz.questions = updatedQuestions;

        updatedQuizzes[quizIndex] = currentQuiz;

        this.quizzes$.next(updatedQuizzes);
        this.localStorageService.updateLocalStorage(
          StorageKey.QUIZZES,
          updatedQuizzes
        );

        subscriber.next(updatedQuestions[questionIndex]);
      }

      subscriber.complete();
    });
  }

  setQuizResult(quizResult: QuizResult): Observable<QuizResult> {
    return new Observable<QuizResult>((subscriber) => {
      this.localStorageService.updateLocalStorage(
        StorageKey.QUIZ_RESULT,
        quizResult
      );
      subscriber.next(quizResult);
      subscriber.complete();
    });
  }
}
