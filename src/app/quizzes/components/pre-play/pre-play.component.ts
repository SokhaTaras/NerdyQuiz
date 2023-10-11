import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { QuizService } from '@a-quizzes/services/quiz/quiz.service';
import { NavigateToService } from '@a-shared/services/navigate-to/navigate-to.service';
import { BaseQuizComponent } from '@a-shared/components/base-quiz/base-quiz.component';
import { BUTTON_TYPE, DIVIDER } from '@a-shared/enums/shared-components';
import { SubscriptionsService } from '@a-shared/services/subscription/subscriptions.service';
import { SVG_COLOR, SVG_TYPE } from '@a-shared/enums/svg';
import { Quiz } from '@a-quizzes/interfaces/quiz';

@Component({
  selector: 'quiz-app-pre-play',
  templateUrl: './pre-play.component.html',
  providers: [SubscriptionsService]
})
export class PrePlayComponent extends BaseQuizComponent implements OnInit {
  readonly BUTTON_TYPE = BUTTON_TYPE;
  readonly SVG_TYPE = SVG_TYPE;
  readonly SVG_COLOR = SVG_COLOR;
  readonly DIVIDER = DIVIDER;

  playMode: boolean = false;
  quizzes: Quiz[];

  constructor(
    quizService: QuizService,
    route: ActivatedRoute,
    navigateTo: NavigateToService,
    subscriptionsService: SubscriptionsService
  ) {
    super(quizService, route, navigateTo, subscriptionsService);
  }

  togglePlayMode() {
    this.playMode = !this.playMode;
  }
}
