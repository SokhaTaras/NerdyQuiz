import { Injectable } from '@angular/core';

import { Quiz } from '../../../quizzes/interfaces/quiz';
import { DifficultiesEnum } from '../../enums/questionTypes';
import {
  DifficultyRanges,
  DifficultyPoints
} from '../../../questions/constants/questions-info';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  getAverageQuizDifficulty(quiz: Quiz): string {
    const difficulties = quiz.questions.map((q) => q.difficulty);
    const average = this.calculateAverageDifficulty(difficulties);
    return average;
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

  getQuestionsWeight(difficulties: string[]): number {
    return difficulties.reduce((sum: number, element: string): number => {
      const weight = DifficultyPoints[element] || 0;
      const weightSum = sum + weight;

      return weightSum;
    }, 0);
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
