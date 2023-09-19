import { Injectable } from '@angular/core';

import { LocalStorageService } from '@a-shared/services/local-storage/local-storage.service';
import { Quiz } from '@a-quizzes/interfaces/quiz';
import {
  DifficultyPoints,
  DifficultyRanges
} from '@a-questions/constants/questions-info';
import { QuestionResult } from '@a-questions/interfaces/question';
import { StorageKey } from '@a-shared/enums/storageKey';
import { DifficultiesEnum } from '@a-shared/enums/question-info';

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
