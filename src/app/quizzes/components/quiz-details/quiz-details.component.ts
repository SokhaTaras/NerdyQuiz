import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { QuizService } from '../../services/quiz/quiz.service';
import { ModalQuizService } from '../../services/modal-quiz/modal-quiz.service';
import { NavigateToService } from '../../../shared/services/navigate-to/navigate-to.service';
import { BaseQuizComponent } from '../../../shared/components/base-quiz/base-quiz.component';
import { SubscriptionsService } from '../../../shared/services/subscription/subscriptions.service';
import { BUTTON_TYPE } from '../../../shared/enums/buttonType';
import { StatisticsService } from '../../../shared/services/statistics/statistics.service';

@Component({
  selector: 'quiz-app-quiz-details',
  templateUrl: 'quiz-details.component.html',
  providers: [SubscriptionsService]
})
export class QuizDetailsComponent extends BaseQuizComponent implements OnInit {
  readonly BUTTON_TYPE = BUTTON_TYPE;

  constructor(
    private modalQuizService: ModalQuizService,
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

  openEditPopUp(): void {
    const data: any = {
      label: 'BUTTON.EDIT_QUIZ',
      buttonText: 'BUTTON.EDIT',
      quiz: this.currentQuiz
    };
    this.modalQuizService.showInitQuizModal(data);
  }
}
