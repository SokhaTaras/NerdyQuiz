import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { QuizService } from '@a-quizzes/services/quiz/quiz.service';
import { NavigateToService } from '@a-shared/services/navigate-to/navigate-to.service';
import { BaseQuizComponent } from '@a-shared/components/base-quiz/base-quiz.component';
import { StatisticsService } from '@a-shared/services/statistics/statistics.service';
import { BUTTON_TYPE } from '@a-shared/enums/buttonType';
import { SubscriptionsService } from '@a-shared/services/subscription/subscriptions.service';

@Component({
  selector: 'quiz-app-pre-play',
  templateUrl: './pre-play.component.html',
  providers: [SubscriptionsService]
})
export class PrePlayComponent extends BaseQuizComponent implements OnInit {
  readonly BUTTON_TYPE = BUTTON_TYPE;

  playMode: boolean = false;

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
