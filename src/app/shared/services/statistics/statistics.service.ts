import { Injectable } from '@angular/core';

import { Quiz } from '../../../quizzes/interfaces/quiz';
import {
  DifficultyPoints,
  DifficultyRanges
} from '../../../questions/constants/questions-info';
import { QuestionResult } from '../../../questions/interfaces/question';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { StorageKey } from '../../enums/storageKey';
import { DifficultiesEnum } from '../../enums/question-info';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  constructor(private localStorageService: LocalStorageService) {}

  getAverageQuizDifficulty(quiz: Quiz): string {
    const difficulties = quiz.questions.map((q) => q.difficulty);
    const average = this.calculateAverageDifficulty(difficulties);
    return average;
  }

  getQuestionsWeight(difficulties: string[]): number {
    return difficulties.reduce((sum: number, element: string): number => {
      const weight = DifficultyPoints[element] || 0;
      const weightSum = sum + weight;

      return weightSum;
    }, 0);
  }

  getQuestionResults(): QuestionResult[] {
    return this.localStorageService.getParsedData(StorageKey.QUIZ_RESULT);
  }

  extractCorrectnessArray(questionResults: QuestionResult[]): boolean[] {
    return questionResults
      .filter((result) => result.answer.isCorrect === true)
      .map(() => true);
  }

  private calculateAverageDifficulty(difficulties: string[]): string {
    const totalDifficultyCount = difficulties.length;

    if (!difficulties || totalDifficultyCount === 0) {
      return '';
    }

    const weightedSum = this.getQuestionsWeight(difficulties);

    const averageDifficulty = weightedSum / totalDifficultyCount;
    const difficulty = this.getDifficulty(averageDifficulty);
    return difficulty;
  }

  private getDifficulty(averageDifficulty: number): string {
    if (
      averageDifficulty >= DifficultyRanges.Easy.min &&
      averageDifficulty <= DifficultyRanges.Easy.max
    ) {
      return DifficultiesEnum.Easy;
    } else if (
      averageDifficulty >= DifficultyRanges.Medium.min &&
      averageDifficulty <= DifficultyRanges.Medium.max
    ) {
      return DifficultiesEnum.Medium;
    } else {
      return DifficultiesEnum.Hard;
    }
  }
}
