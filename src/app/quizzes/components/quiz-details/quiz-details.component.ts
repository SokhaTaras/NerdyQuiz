import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { QuizService } from '@a-quizzes/services/quiz/quiz.service';
import { NavigateToService } from '@a-shared/services/navigate-to/navigate-to.service';
import { BaseQuizComponent } from '@a-shared/components/base-quiz/base-quiz.component';
import { SubscriptionsService } from '@a-shared/services/subscription/subscriptions.service';
import { BUTTON_TYPE } from '@a-shared/enums/shared-components';
import { ModalQuizService } from '@a-quizzes/services/modal-quiz/modal-quiz.service';
import { Quiz } from '@a-quizzes/interfaces/quiz';
import { QuizStateService } from '@a-quizzes/services/quiz-state/quiz-state.service';

@Component({
  selector: 'quiz-app-quiz-details',
  templateUrl: 'quiz-details.component.html',
  providers: [SubscriptionsService]
})
export class QuizDetailsComponent extends BaseQuizComponent implements OnInit {
  readonly BUTTON_TYPE = BUTTON_TYPE;

  selectedQuiz$: Observable<Quiz>;

  constructor(
    quizService: QuizService,
    route: ActivatedRoute,
    navigateTo: NavigateToService,
    subscriptionsService: SubscriptionsService,
    private modalQuizService: ModalQuizService,
    private quizState: QuizStateService
  ) {
    super(quizService, route, navigateTo, subscriptionsService);
  }

  override ngOnInit() {
    super.ngOnInit();
    this.getQuiz();
    this.setQuiz();
  }

  openEditPopUp(): void {
    const data: any = {
      label: 'BUTTON.EDIT_QUIZ',
      buttonText: 'BUTTON.EDIT',
      quiz: this.currentQuiz
    };
    this.modalQuizService.showInitQuizModal(data);
  }

  confirmRemoving(): void {
    const data: any = {
      text: 'CONFIRM_MODAL_TEXT.DELETE_QUIZ',
      buttonText: 'BUTTON.CONFIRM'
    };

    this.subscriptionsService.addSubscription(
      this.modalQuizService
        .confirmDeletionModal(data)
        .onClose.subscribe((isConfirm) => {
          if (isConfirm) {
            this.deleteQuiz();
          }
        })
    );
  }

  deleteQuiz(): void {
    this.quizState.deleteQuiz(this.currentQuiz);
    this.navigateTo.navigateHome();
  }

  private setQuiz(): void {
    this.selectedQuiz$ = this.quizState.selectedQuiz$;
  }

  private getQuiz(): void {
    this.quizState.getQuiz(this.currentQuiz.id);
  }
}
