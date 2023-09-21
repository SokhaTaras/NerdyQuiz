import { Component, Input } from '@angular/core';

import { BUTTON_TYPE, POPOVER_TYPE } from '@a-shared/enums/shared-components';
import { NavigateToService } from '@a-shared/services/navigate-to/navigate-to.service';
import { ModalQuizService } from '@a-quizzes/services/modal-quiz/modal-quiz.service';
import { SubscriptionsService } from '@a-shared/services/subscription/subscriptions.service';
import { QuizService } from '@a-quizzes/services/quiz/quiz.service';
import { Quiz } from '@a-quizzes/interfaces/quiz';

@Component({
  selector: 'quiz-app-quiz-update-popover',
  templateUrl: './quiz-update-popover.component.html'
})
export class QuizUpdatePopoverComponent {
  @Input() quiz: Quiz;
  @Input() type: POPOVER_TYPE;

  readonly BUTTON_TYPE = BUTTON_TYPE;
  readonly POPOVER_TYPE = POPOVER_TYPE;

  constructor(
    private navigateTo: NavigateToService,
    private modalQuizService: ModalQuizService,
    private subscriptionsService: SubscriptionsService,
    private quizService: QuizService
  ) {}

  goEdit(): void {
    this.navigateTo.navigateToQuizDetailsPage(this.quiz.id);
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

  private deleteQuiz(): void {
    this.subscriptionsService.addSubscription(
      this.quizService.deleteQuiz(this.quiz).subscribe()
    );
  }
}
