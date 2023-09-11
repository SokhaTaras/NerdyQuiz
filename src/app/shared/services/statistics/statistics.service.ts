import { Injectable } from '@angular/core';

import { Quiz } from '../../../quizzes/interfaces/quiz';
import { Difficulties } from '../../types/formsType';
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
    return this.calculateAverageDifficulty(difficulties);
  }

  private calculateAverageDifficulty(difficulties: string[]): string {
    if (!difficulties || difficulties.length === 0) {
      return '';
    }

    const difficultyCounts: Difficulties = {
      Easy: 0,
      Medium: 0,
      Hard: 0
    };

    const updatedCounts = this.countDifficultyOccurrences(
      difficulties,
      difficultyCounts
    );

    const totalDifficultyCount = difficulties.length;

    const weightedSum = this.getWeightOfQuestions(updatedCounts);

    const averageDifficulty = weightedSum / totalDifficultyCount;

    const difficulty = this.getDifficulty(averageDifficulty);
    return difficulty;
  }

  private getWeightOfQuestions(updatedCounts: Difficulties): number {
    return (
      updatedCounts.Easy * DifficultyPoints.Easy +
      updatedCounts.Medium * DifficultyPoints.Medium +
      updatedCounts.Hard * DifficultyPoints.Hard
    );
  }

  private countDifficultyOccurrences(
    difficulties: string[],
    counts: Difficulties
  ): Difficulties {
    difficulties.forEach((val) => {
      switch (val) {
        case DifficultiesEnum.Easy:
          counts.Easy++;
          break;
        case DifficultiesEnum.Medium:
          counts.Medium++;
          break;
        case DifficultiesEnum.Hard:
          counts.Hard++;
          break;
        default:
          break;
      }
    });

    return counts;
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
