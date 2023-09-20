import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { QuizService } from '@a-quizzes/services/quiz/quiz.service';
import { NavigateToService } from '@a-shared/services/navigate-to/navigate-to.service';
import { BaseQuizComponent } from '@a-shared/components/base-quiz/base-quiz.component';
import { SubscriptionsService } from '@a-shared/services/subscription/subscriptions.service';
import { BUTTON_TYPE } from '@a-shared/enums/buttonType';
import { ModalQuizService } from '@a-quizzes/services/modal-quiz/modal-quiz.service';

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
    subscriptionsService: SubscriptionsService
  ) {
    super(quizService, route, navigateTo, subscriptionsService);
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
