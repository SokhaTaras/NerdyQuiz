import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../services/quiz/quiz.service';
import { BaseQuizComponent } from '../../../shared/components/base-quiz/base-quiz.component';
import { NavigateToService } from '../../../shared/services/navigate-to/navigate-to.service';
import { StatisticsService } from '../../../shared/services/statistics/statistics.service';

@Component({
  selector: 'quiz-app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent extends BaseQuizComponent implements OnInit {
  constructor(
    quizService: QuizService,
    route: ActivatedRoute,
    navigateTo: NavigateToService,
    statisticsService: StatisticsService
  ) {
    super(statisticsService, quizService, route, navigateTo);
  }
}
