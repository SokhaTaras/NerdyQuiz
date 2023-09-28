import { Injectable } from '@angular/core';

import { LocalStorageService } from '@a-shared/services/local-storage/local-storage.service';
import {
  QuestionResult,
  QuizResult
} from '@a-questions/interfaces/question';
import { StorageKey } from '@a-shared/enums/storageKey';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  constructor(private localStorageService: LocalStorageService) {}

  getQuestionResults(): QuestionResult[] {
    return this.localStorageService.getParsedData(StorageKey.QUIZ_RESULT);
  }

  extractCorrectnessArray(quizResult: QuizResult): QuestionResult[] {
    return quizResult?.questionResults?.filter(
      (result) => result.answer.isCorrect === true
    );
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
