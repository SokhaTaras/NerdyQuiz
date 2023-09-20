import { Injectable } from '@angular/core';

import { LocalStorageService } from '@a-shared/services/local-storage/local-storage.service';
import { QuestionResult } from '@a-questions/interfaces/question';
import { StorageKey } from '@a-shared/enums/storageKey';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  constructor(private localStorageService: LocalStorageService) {}

  getQuestionResults(): QuestionResult[] {
    return this.localStorageService.getParsedData(StorageKey.QUIZ_RESULT);
  }

  getRating(): number {
    const questionResults = this.getQuestionResults();
    const correctnessArray = this.extractCorrectnessArray(questionResults);
    const rating = this.calculateRating(correctnessArray);
    return rating;
  }

  extractCorrectnessArray(questionResults: QuestionResult[]): boolean[] {
    return questionResults.map((result) => result.answer.isCorrect);
  }

  countCorrectAnswers(correctnessArray: boolean[]): number {
    return correctnessArray.filter((isCorrect) => isCorrect).length;
  }

  private calculateRating(correctnessArray: boolean[]): number {
    if (correctnessArray.length === 0) {
      return 0;
    }

    const correctAnswersCount = this.countCorrectAnswers(correctnessArray);
    const totalAnswers = correctnessArray.length;
    const percentage = (correctAnswersCount / totalAnswers) * 100;
    const rating = Math.round(percentage);
    return rating;
  }
}
