import { Component, Input, OnInit } from '@angular/core';

import { Quiz } from '@a-quizzes/interfaces/quiz';
import { BUTTON_TYPE } from '@a-shared/enums/buttonType';
import { NavigateToService } from '@a-shared/services/navigate-to/navigate-to.service';
import { StatisticsService } from '@a-shared/services/statistics/statistics.service';

@Component({
  selector: 'quiz-app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.scss']
})
export class QuizCardComponent implements OnInit {
  @Input() quiz: Quiz;

  quizDifficulty: string;

  readonly BUTTON_TYPE = BUTTON_TYPE;

  constructor(
    private statisticsService: StatisticsService,
    private navigateTo: NavigateToService
  ) {}

  ngOnInit(): void {
    this.getAverageQuizDifficulty();
  }

  getAverageQuizDifficulty(): void {
    this.quizDifficulty = this.statisticsService.getAverageQuizDifficulty(
      this.quiz
    );
  }

  goPlay(): void {
    this.navigateTo.navigatePlay(this.quiz);
  }
}
