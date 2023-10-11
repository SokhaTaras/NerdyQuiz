import { Component, Input, OnInit } from '@angular/core';

import { ModalQuizService } from '@a-quizzes/services/modal-quiz/modal-quiz.service';
import { Question } from '@a-questions/interfaces/question';
import { QuizService } from '@a-quizzes/services/quiz/quiz.service';
import {
  BUTTON_TYPE,
  CORRECTNESS,
  POPOVER_ITEM_TYPE
} from '@a-shared/enums/shared-components';
import { SubscriptionsService } from '@a-shared/services/subscription/subscriptions.service';
import { PopoverItem } from '@a-shared/types/popover';
import { PopoverItemClass } from '@a-shared/classes/popover-item/popover-item';
import { CorrectnessStatusInfo } from '@a-shared/types/correctness-status-info';
import { SVG_COLOR, SVG_TYPE } from '@a-shared/enums/svg';
import { ConfirmationModalData } from '@a-quizzes/interfaces/modal-data';

@Component({
  selector: 'quiz-app-question-card',
  templateUrl: './question-card.component.html',
  providers: [SubscriptionsService]
})
export class QuestionCardComponent implements OnInit {
  @Input() question: Question;
  @Input() questionIndex: number;
  @Input() quizId: string | null;

  readonly BUTTON_TYPE = BUTTON_TYPE;
  readonly CORRECTNESS = CORRECTNESS;
  readonly SVG_TYPE = SVG_TYPE;
  readonly SVG_COLOR = SVG_COLOR;

  popoverSetup: PopoverItem[];
  isShown = false;
  indicatorsInfo: CorrectnessStatusInfo[];

  constructor(
    private modalQuizService: ModalQuizService,
    private quizService: QuizService,
    private subscriptionsService: SubscriptionsService
  ) {
    this.setupPopoverContent();
  }

  ngOnInit() {
    this.setIndicatorInfoInfo();
  }

  deleteQuestionConfirm(): void {
    const data: ConfirmationModalData = {
      text: 'CONFIRM_MODAL_TEXT.DELETE_QUESTION',
      label: 'CONFIRM_MODAL_TEXT.LABEL.QUIZ_DELETION'
    };

    this.subscriptionsService.addSubscription(
      this.modalQuizService
        .confirmDeletionModal(data)
        .onClose.subscribe((isConfirm) => {
          if (isConfirm) {
            this.deleteQuestion();
          }
        })
    );
  }

  toggleCollapse(): void {
    this.isShown = !this.isShown;
  }

  private setupPopoverContent(): void {
    this.popoverSetup = [
      new PopoverItemClass(
        'BUTTON.EDIT_QUESTION',
        POPOVER_ITEM_TYPE.PRIMARY,
        SVG_TYPE.EDIT,
        SVG_COLOR.PRIMARY,
        this.editQuestion.bind(this)
      ),
      new PopoverItemClass(
        'BUTTON.DELETE_QUESTION',
        POPOVER_ITEM_TYPE.ERROR,
        SVG_TYPE.TRASH,
        SVG_COLOR.RED,
        this.deleteQuestionConfirm.bind(this)
      )
    ];
  }

  private editQuestion(): void {}

  private deleteQuestion(): void {
    this.subscriptionsService.addSubscription(
      this.quizService
        .deleteQuestion(this.quizId, this.questionIndex)
        .subscribe()
    );
  }

  private setIndicatorInfoInfo(): void {
    this.indicatorsInfo = this.question.answers.map(
      (answer): CorrectnessStatusInfo => {
        return answer.isCorrect
          ? {
              correctness: this.CORRECTNESS.CORRECT,
              icon: SVG_TYPE.CHECK,
              iconColor: SVG_COLOR.GREEN
            }
          : {
              correctness: this.CORRECTNESS.WRONG,
              icon: SVG_TYPE.X,
              iconColor: SVG_COLOR.RED
            };
      }
    );
  }
}
