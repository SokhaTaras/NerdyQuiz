import { Component, OnInit } from '@angular/core';

import { QuizService } from '../../services/quiz/quiz.service';
import { StatisticsService } from '../../../shared/services/statistics/statistics.service';

@Component({
  selector: 'quiz-app-result',
  templateUrl: './result.component.html'
})
export class ResultComponent implements OnInit {
  rating: string;

  constructor(
    private quizService: QuizService,
    private statisticsService: StatisticsService
  ) {}

  ngOnInit(): void {
    console.log('res', this.quizService.questionsResults);
    this.rating = this.getRating();
    console.log(this.rating);
  }

  getRating(): string {
    if (this.quizService.questionsResults) {
      return this.statisticsService.getRating(
        this.quizService.questionsResults
      );
    }
    return 'no';
  }
}
