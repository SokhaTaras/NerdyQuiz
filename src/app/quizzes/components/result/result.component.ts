import { Component, OnInit } from '@angular/core';

import { QuizService } from '../../services/quiz/quiz.service';
import { StatisticsService } from '../../../shared/services/statistics/statistics.service';
import { Result } from '../../../shared/enums/result';
import { BUTTON_TYPE } from '../../../shared/enums/buttonType';
import { QuestionResult } from '../../../questions/interfaces/question';

@Component({
  selector: 'quiz-app-result',
  templateUrl: './result.component.html'
})
export class ResultComponent implements OnInit {
  rating: number;
  spentTime: number;
  correctAnswersCount: number;
  resultText: string;
  questionResult: QuestionResult[];

  readonly BUTTON_TYPE = BUTTON_TYPE;

  constructor(
    private quizService: QuizService,
    private statisticsService: StatisticsService
  ) {}

  ngOnInit(): void {
    this.questionResult = this.getQuestionResult();
    this.rating = this.getRating();
    this.setSpentTime();
    this.setResultText();
    this.correctAnswersCount = this.calculateCorrectAnswersCount();
  }

  private getRating(): number {
    if (this.quizService.questionsResults) {
      return this.statisticsService.getRating();
    }
    return 0;
  }

  private getQuestionResult(): QuestionResult[] {
    return this.statisticsService.getQuestionResults();
  }

  private setSpentTime(): void {
    this.spentTime =
      this.questionResult[this?.questionResult?.length - 1]?.timeSpent;
  }

  private calculateCorrectAnswersCount(): number {
    const correctnessArray = this.statisticsService.extractCorrectnessArray(
      this.questionResult
    );
    return this.statisticsService.countCorrectAnswers(correctnessArray);
  }

  private setResultText(): void {
    if (this.rating === Result.EXCELLENT) {
      this.resultText = 'RESULT_QUOTES.EXCELLENT';
    } else if (this.rating >= Result.TRY_HARDER) {
      this.resultText = 'RESULT_QUOTES.PASSED_QUIZ';
    } else if (
      this.rating < Result.TRY_HARDER &&
      this.rating > Result.LEARN_MORE
    ) {
      this.resultText = 'RESULT_QUOTES.TRY_HARDER';
    } else {
      this.resultText = 'RESULT_QUOTES.LEARN_MORE';
    }
  }

  // private setResultText(): void {
  //     this.resultText = this.getResultTextBasedOnRating();
  //   }
  //
  //   private getResultTextBasedOnRating(): string {
  //     if (this.rating === Result.EXCELLENT) {
  //       return 'RESULT_QUOTES.EXCELLENT';
  //     }
  //     return this.rating >= Result.TRY_HARDER
  //       ? 'RESULT_QUOTES.PASSED_QUIZ'
  //       : this.rating > Result.LEARN_MORE
  //       ? 'RESULT_QUOTES.TRY_HARDER'
  //       : 'RESULT_QUOTES.LEARN_MORE';
  //   }
}
