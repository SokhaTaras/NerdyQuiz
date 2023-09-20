import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import {
  Answer,
  Question,
  QuestionResult
} from '../../../questions/interfaces/question';
import { StorageKey } from '../../enums/storageKey';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class QuizHelperService {
  questionsResults = new BehaviorSubject<QuestionResult[]>([]);

  constructor(private localStorageService: LocalStorageService) {}

  setQuizResult(): Observable<QuestionResult[]> {
    return new Observable((subscriber) => {
      console.log(this.questionsResults.value);
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
      let currentResults = this.questionsResults.value;
      const existingResultIndex = this.findExistingResultIndex(
        currentResults,
        question
      );

      if (existingResultIndex !== -1) {
        currentResults[existingResultIndex] = {
          ...currentResults[existingResultIndex],
          answer,
          timeSpent
        };
      } else {
        currentResults.push({
          ...question,
          answer,
          timeSpent
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
