import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, map, Observable } from 'rxjs';

import { Quiz } from '../../interfaces/quiz';
import { Answer, Question } from '../../../questions/interfaces/question';
import { LocalStorageService } from '../../../shared/services/local-storage/local-storage.service';
import { getNewQuestionId, getNewQuizId } from '../../../shared/utils/getId';
import { StorageKey } from '../../../shared/enums/storageKey';
import { QuestionResult } from '../../../questions/interfaces/question';

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
        quiz.id = getNewQuizId();
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

  editQuiz(quizId: string | undefined, data: Quiz): Observable<Quiz> {
    return new Observable<Quiz>((subscriber) => {
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
        subscriber.next(currentQuizzes[quizIndex]);
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
    let allQuizzes: string = this.localStorageService.getLocalStorageData(key);

    if (allQuizzes !== null) {
      this.localStorageService.setLocalStorageData(key, allQuizzes);
      this.quizzes$.next(JSON.parse(allQuizzes));
    }

    return new Observable<Quiz[]>((subscriber) => {
      subscriber.next(JSON.parse(allQuizzes));
      subscriber.complete();
    }).pipe(delay(1000));
  }

  addQuestion(quizId: string | null, question: Question): Observable<Question> {
    return new Observable<Question>((subscriber) => {
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
          subscriber.next(question);
        }
      } else {
        subscriber.error();
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
        subscriber.next(updatedQuestions[questionIndex]);
      } else {
        subscriber.error();
      }
      subscriber.complete();
    });
  }

  setQuizResult(): Observable<QuestionResult[]> {
    return new Observable((subscriber) => {
      this.localStorageService.updateLocalStorage(
        StorageKey.QUIZ_RESULT,
        this.questionsResults.value
      );
      subscriber.next(this.questionsResults.value);
      subscriber.complete();
    });
  }

  addQuestionResult(
    question: Question,
    answer: Answer,
    timeSpent: number
  ): Observable<QuestionResult[]> {
    return new Observable<QuestionResult[]>((subscriber) => {
      this.questionsResults.next(
        this.questionsResults.value.concat([{ ...question, answer, timeSpent }])
      );

      subscriber.next(this.questionsResults.value);
      subscriber.complete();
    });
  }

  removeLastQuestionResult(index: number): Observable<QuestionResult> {
    return new Observable<QuestionResult>((subscriber) => {
      const deletedItem = this.questionsResults.value.splice(index, 1);

      subscriber.next(deletedItem[0]);
      subscriber.complete();
    });
  }
}
