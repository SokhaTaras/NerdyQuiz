import { Component, OnDestroy, OnInit } from '@angular/core';

import { QuizService } from '../../services/quiz/quiz.service';
import { ActivatedRoute } from '@angular/router';
import { NavigateToService } from '../../../shared/services/navigate-to/navigate-to.service';
import { BaseQuizComponent } from '../../../shared/components/base-quiz/base-quiz.component';

@Component({
  selector: 'quiz-app-pre-play',
  templateUrl: './pre-play.component.html',
  styleUrls: ['./pre-play.component.scss']
})
export class PrePlayComponent
  extends BaseQuizComponent
  implements OnInit, OnDestroy
{
  constructor(
    quizService: QuizService,
    route: ActivatedRoute,
    navigateTo: NavigateToService
  ) {
    super(quizService, route, navigateTo);
  }
}
