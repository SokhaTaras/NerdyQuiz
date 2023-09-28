import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import {
  Answer,
  Question,
  QuestionResult
} from '@a-questions/interfaces/question';

@Injectable({
  providedIn: 'root'
})
export class QuizHelperService {
  questionsResults = new BehaviorSubject<QuestionResult[]>([]);

  addQuestionResult(
    question: Question,
    answer: Answer,
    questionTime: number
  ): Observable<QuestionResult[]> {
    return new Observable<QuestionResult[]>((subscriber) => {
      let currentResults = this.questionsResults.value;
      const existingResultIndex = this.findExistingResultIndex(
        currentResults,
        question
      );

      if (existingResultIndex !== -1) {
        currentResults[existingResultIndex] = {
          ...currentResults[existingResultIndex],
          answer,
          questionTime
        };
      } else {
        currentResults.push({
          ...question,
          answer,
          questionTime
        });
      }

      this.questionsResults.next(currentResults);

      subscriber.next(currentResults);
      subscriber.complete();
    });
  }

  private findExistingResultIndex(
    currentResults: QuestionResult[],
    question: Question
  ) {
    return currentResults.findIndex((result) => result.id === question.id);
  }
}
