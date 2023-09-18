import { Component, OnInit } from '@angular/core';

import { QuizService } from '../../services/quiz/quiz.service';
import { StatisticsService } from '../../../shared/services/statistics/statistics.service';
import { Result } from '../../../shared/enums/result';
import { BUTTON_TYPE } from '../../../shared/enums/buttonType';

@Component({
  selector: 'quiz-app-result',
  templateUrl: './result.component.html'
})
export class ResultComponent implements OnInit {
  rating: number;
  resultText: string;
  progressBarWidth: string;

  readonly BUTTON_TYPE = BUTTON_TYPE;

  constructor(
    private quizService: QuizService,
    private statisticsService: StatisticsService
  ) {}

  ngOnInit(): void {
    this.rating = this.getRating();
    this.setResultProperties();
  }

  private getRating(): number {
    if (this.quizService.questionsResults) {
      return this.statisticsService.getRating();
    }
    return 0;
  }

  private setResultProperties(): void {
    if (this.rating === Result.EXCELLENT) {
      this.resultText = 'RESULT_QUOTES.EXCELLENT';
      this.progressBarWidth = 'w-full';
    } else if (this.rating >= Result.TRY_HARDER) {
      this.resultText = 'RESULT_QUOTES.PASSED_QUIZ';
      this.progressBarWidth = 'w-10/12';
    } else if (
      this.rating < Result.TRY_HARDER &&
      this.rating > Result.LEARN_MORE
    ) {
      this.resultText = 'RESULT_QUOTES.TRY_HARDER';
      this.progressBarWidth = 'w-8/12';
    } else {
      this.resultText = 'RESULT_QUOTES.LEARN_MORE';
      this.progressBarWidth = 'w-0';
    }
  }
}
