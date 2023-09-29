import { Component, Input, OnInit } from '@angular/core';

import { Quiz } from '@a-quizzes/interfaces/quiz';
import { BUTTON_TYPE } from '@a-shared/enums/shared-components';
import { NavigateToService } from '@a-shared/services/navigate-to/navigate-to.service';
import { ModalQuizService } from '@a-quizzes/services/modal-quiz/modal-quiz.service';
import { SubscriptionsService } from '@a-shared/services/subscription/subscriptions.service';
import { QuizService } from '@a-quizzes/services/quiz/quiz.service';
import { ButtonConfig, Popover } from '@a-shared/types/popover';
import { createButtonConfig } from '@a-shared/utils/popover-item-configurator';

@Component({
  selector: 'quiz-app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.scss']
})
export class QuizCardComponent implements OnInit {
  @Input() quiz: Quiz;

  readonly BUTTON_TYPE = BUTTON_TYPE;

  popoverSetup: Popover;

  constructor(
    private navigateTo: NavigateToService,
    private modalQuizService: ModalQuizService,
    private subscriptionsService: SubscriptionsService,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    this.setupPopoverContent();
  }

  setupPopoverContent(): void {
    const editButton: ButtonConfig = createButtonConfig(
      'BUTTON.EDIT_QUIZ',
      BUTTON_TYPE.PRIMARY,
      this.goEdit,
      this
    );

    const deleteButton: ButtonConfig = createButtonConfig(
      'BUTTON.DELETE_QUIZ',
      BUTTON_TYPE.ERROR,
      this.confirmRemoving,
      this
    );
    this.popoverSetup = [editButton, deleteButton];
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

  goPlay(): void {
    this.navigateTo.navigatePlay(this.quiz?.id);
  }

  deleteQuiz(): void {
    this.subscriptionsService.addSubscription(
      this.quizService.deleteQuiz(this.quiz).subscribe()
    );
  }
}
