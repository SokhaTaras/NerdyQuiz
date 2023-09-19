import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { QuizService } from '../../services/quiz/quiz.service';
import { NavigateToService } from '../../../shared/services/navigate-to/navigate-to.service';
import { BaseQuizComponent } from '../../../shared/components/base-quiz/base-quiz.component';
import { StatisticsService } from '../../../shared/services/statistics/statistics.service';
import { BUTTON_TYPE } from '../../../shared/enums/buttonType';
import { SubscriptionsService } from '../../../shared/services/subscription/subscriptions.service';

@Component({
  selector: 'quiz-app-pre-play',
  templateUrl: './pre-play.component.html',
  providers: [SubscriptionsService]
})
export class PrePlayComponent extends BaseQuizComponent implements OnInit {
  playMode: Boolean = false;
  readonly BUTTON_TYPE = BUTTON_TYPE;

  constructor(
    quizService: QuizService,
    route: ActivatedRoute,
    navigateTo: NavigateToService,
    statisticsService: StatisticsService,
    subscriptionsService: SubscriptionsService
  ) {
    super(
      statisticsService,
      quizService,
      route,
      navigateTo,
      subscriptionsService
    );
  }

  togglePlayMode() {
    this.playMode = !this.playMode;
  }
}
