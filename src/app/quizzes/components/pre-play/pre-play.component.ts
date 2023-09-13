import { Component, OnDestroy, OnInit } from '@angular/core';

import { QuizService } from '../../services/quiz/quiz.service';
import { ActivatedRoute } from '@angular/router';
import { NavigateToService } from '../../../shared/services/navigate-to/navigate-to.service';
import { BaseQuizComponent } from '../../../shared/components/base-quiz/base-quiz.component';
import { StatisticsService } from '../../../shared/services/statistics/statistics.service';
import { BUTTON_TYPE } from '../../../shared/enums/buttonType';

@Component({
  selector: 'quiz-app-pre-play',
  templateUrl: './pre-play.component.html'
})
export class PrePlayComponent
  extends BaseQuizComponent
  implements OnInit, OnDestroy
{
  readonly BUTTON_TYPE = BUTTON_TYPE;
  playMode: Boolean = false;

  constructor(
    quizService: QuizService,
    route: ActivatedRoute,
    navigateTo: NavigateToService,
    statisticsService: StatisticsService
  ) {
    super(statisticsService, quizService, route, navigateTo);
  }

  togglePlayMode() {
    this.playMode = !this.playMode;
  }
}
