import { Component, Input } from '@angular/core';

import { ModalQuizService } from '@a-quizzes/services/modal-quiz/modal-quiz.service';
import { Question } from '@a-questions/interfaces/question';
import { QuizService } from '@a-quizzes/services/quiz/quiz.service';
import { BUTTON_TYPE } from '@a-shared/enums/shared-components';
import { SubscriptionsService } from '@a-shared/services/subscription/subscriptions.service';
import { StoreService } from '@a-store/services/store.service';
import { AppState } from '@a-store/state/app.state';
import {
  DeleteQuestion,
  DeleteQuestionSuccess
} from '@a-store/actions/quizz.actions';

@Component({
  selector: 'quiz-app-question-card',
  templateUrl: './question-card.component.html',
  providers: [SubscriptionsService]
})
export class QuestionCardComponent {
  @Input() question: Question;
  @Input() questionIndex: number;
  @Input() quizId: string | null;

  readonly BUTTON_TYPE = BUTTON_TYPE;

  constructor(
    private modalQuizService: ModalQuizService,
    private quizService: QuizService,
    private subscriptionsService: SubscriptionsService,
    private store: StoreService<AppState>
  ) {}

  deleteQuestionConfirm(): void {
    const data: any = {
      text: 'CONFIRM_MODAL_TEXT.DELETE_QUESTION',
      buttonText: 'LABELS.DELETE'
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

  private deleteQuestion(): void {
    const quizId = this.quizId;
    const questionIndex = this.questionIndex;

    if (quizId !== undefined && questionIndex !== undefined) {
      this.store.dispatcher(DeleteQuestionSuccess({ question: this.question }));
    }
  }
}
