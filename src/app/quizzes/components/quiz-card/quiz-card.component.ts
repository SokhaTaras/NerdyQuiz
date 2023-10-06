import { Component, Input } from '@angular/core';

import { Quiz, QUIZ_DIFFICULTY } from '@a-quizzes/interfaces/quiz';
import {
  BUTTON_TYPE,
  DIVIDER,
  LABELS,
  POPOVER_ITEM_TYPE
} from '@a-shared/enums/shared-components';
import { NavigateToService } from '@a-shared/services/navigate-to/navigate-to.service';
import { ModalQuizService } from '@a-quizzes/services/modal-quiz/modal-quiz.service';
import { SubscriptionsService } from '@a-shared/services/subscription/subscriptions.service';
import { PopoverItem } from '@a-shared/types/popover';
import { PopoverItemClass } from '@a-shared/classes/popover-item/popover-item';
import { StoreService } from '@a-store/services/store.service';
import { AppState } from '@a-store/state/app.state';
import { DeleteQuiz } from '@a-store/actions/quizz.actions';
import { SVG_COLOR, SVG_TYPE } from '@a-shared/enums/svg';

@Component({
  selector: 'quiz-app-quiz-card',
  templateUrl: './quiz-card.component.html'
})
export class QuizCardComponent {
  @Input() quiz: Quiz;

  readonly BUTTON_TYPE = BUTTON_TYPE;
  readonly LABELS = LABELS;
  readonly DIVIDER = DIVIDER;

  popoverSetup: PopoverItem[] = [];

  get quizDifficultyLabel(): LABELS {
    if (this.quiz.difficulty.value === QUIZ_DIFFICULTY.EASY) {
      return LABELS.GREEN;
    } else if (this.quiz.difficulty.value === QUIZ_DIFFICULTY.MEDIUM) {
      return LABELS.YELLOW;
    } else {
      return LABELS.RED;
    }
  }

  get quizTitle(): string {
    return this.quiz?.title;
  }

  get quizCategory(): string {
    return this.quiz?.category.text;
  }

  get quizDifficulty(): string {
    return this.quiz?.difficulty?.text;
  }

  get amountOfQuestions(): number {
    return this.quiz?.questions?.length || 0;
  }

  constructor(
    private navigateTo: NavigateToService,
    private modalQuizService: ModalQuizService,
    private subscriptionsService: SubscriptionsService,
    private store: StoreService<AppState>
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
        POPOVER_ITEM_TYPE.PRIMARY,
        SVG_TYPE.EDIT,
        SVG_COLOR.PRIMARY,
        this.goEdit.bind(this)
      ),
      new PopoverItemClass(
        'BUTTON.DELETE_QUIZ',
        POPOVER_ITEM_TYPE.ERROR,
        SVG_TYPE.TRASH,
        SVG_COLOR.RED,
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
    this.store.dispatch(DeleteQuiz({ quizToDelete: this.quiz }));
  }
}
