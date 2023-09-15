import { Component, Input, OnInit } from '@angular/core';

import { Quiz } from '../../interfaces/quiz';
import { StatisticsService } from '../../../shared/services/statistics/statistics.service';

@Component({
  selector: 'quiz-app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.scss']
})
export class QuizCardComponent implements OnInit {
  @Input() quiz: Quiz;

  quizDifficulty: string;

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.getAverageQuizDifficulty();
  }

  getAverageQuizDifficulty(): void {
    this.quizDifficulty = this.statisticsService.getAverageQuizDifficulty(
      this.quiz
    );
  }
}
