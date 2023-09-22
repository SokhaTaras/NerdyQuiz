import { Component, Input, OnInit } from '@angular/core';

import { Quiz } from '../../interfaces/quiz';
import { BUTTON_TYPE } from '../../../shared/enums/buttonType';
import { NavigateToService } from '../../../shared/services/navigate-to/navigate-to.service';
import { StatisticsService } from '../../../shared/services/statistics/statistics.service';

@Component({
  selector: 'quiz-app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.scss']
})
export class QuizCardComponent implements OnInit {
  @Input() quiz: Quiz;

  readonly BUTTON_TYPE = BUTTON_TYPE;

  quizDifficulty: string;

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
    this.navigateTo.navigatePlay(this.quiz?.id);
  }
}
