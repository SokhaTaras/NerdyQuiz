import { Component, Input } from '@angular/core';

import { Quiz } from '@a-quizzes/interfaces/quiz';
import { BUTTON_TYPE } from '@a-shared/enums/buttonType';
import { NavigateToService } from '@a-shared/services/navigate-to/navigate-to.service';
import { ModalQuizService } from '@a-quizzes/services/modal-quiz/modal-quiz.service';
import { SubscriptionsService } from '@a-shared/services/subscription/subscriptions.service';
import { QuizService } from '@a-quizzes/services/quiz/quiz.service';

@Component({
  selector: 'quiz-app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.scss']
})
export class QuizCardComponent {
  @Input() quiz: Quiz;

  readonly BUTTON_TYPE = BUTTON_TYPE;

  constructor(
    private navigateTo: NavigateToService,
    private modalQuizService: ModalQuizService,
    private subscriptionsService: SubscriptionsService,
    private quizService: QuizService
  ) {}

  goPlay(): void {
    this.navigateTo.navigatePlay(this.quiz);
  }

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

  private deleteQuiz(): void {}
}
