import { Component, Input } from '@angular/core';

import { Quiz } from '@a-quizzes/interfaces/quiz';
import { BUTTON_TYPE } from '@a-shared/enums/shared-components';
import { NavigateToService } from '@a-shared/services/navigate-to/navigate-to.service';
import { ModalQuizService } from '@a-quizzes/services/modal-quiz/modal-quiz.service';
import { SubscriptionsService } from '@a-shared/services/subscription/subscriptions.service';
import { PopoverItem } from '@a-shared/types/popover';
import { PopoverItemClass } from '@a-shared/classes/popover-item/popover-item';
import { QuizStateService } from '@a-quizzes/services/quiz-state/quiz-state.service';
import { DropDownItem } from '@a-questions/interfaces/question';

@Component({
  selector: 'quiz-app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.scss']
})
export class QuizCardComponent {
  @Input() quiz: Quiz;

  readonly BUTTON_TYPE = BUTTON_TYPE;

  popoverSetup: PopoverItem[] = [];

  get quizDifficulty(): DropDownItem {
    return this?.quiz?.difficulty;
  }

  constructor(
    private navigateTo: NavigateToService,
    private modalQuizService: ModalQuizService,
    private subscriptionsService: SubscriptionsService,
    private quizState: QuizStateService
  ) {
    this.setupPopoverContent();
  }

  goPlay(): void {
    this.navigateTo.navigatePlay(this.quiz?.id);
  }

  private setupPopoverContent(): void {
    this.popoverSetup = [
      new PopoverItemClass(
        'BUTTON.EDIT_QUIZ',
        BUTTON_TYPE.PRIMARY,
        this.goEdit.bind(this)
      ),
      new PopoverItemClass(
        'BUTTON.DELETE_QUIZ',
        BUTTON_TYPE.ERROR,
        this.confirmRemoving.bind(this)
      )
    ];
  }

  private goEdit(): void {
    this.navigateTo.navigateToQuizDetailsPage(this.quiz.id);
  }

  private confirmRemoving(): void {
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
    this.quizState.deleteQuiz(this.quiz);
  }
}
