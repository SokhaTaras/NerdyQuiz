import { Injectable } from '@angular/core';

import { LocalStorageService } from '@a-shared/services/local-storage/local-storage.service';
import { QuestionResult, QuizResult } from '@a-questions/interfaces/question';
import { StorageKey } from '@a-shared/enums/storageKey';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  constructor(private localStorageService: LocalStorageService) {}


  getQuizResults(): QuizResult {
    return this.localStorageService.getParsedData(StorageKey.QUIZ_RESULT);
  }

  extractCorrectnessArray(quizResult: QuizResult): QuestionResult[] {
    return quizResult?.questionResults?.filter(
      (result) => result.answer.isCorrect === true
    );
  }

}
