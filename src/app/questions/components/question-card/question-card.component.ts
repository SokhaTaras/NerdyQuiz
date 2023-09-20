import { Component, Input } from '@angular/core';

import { ModalQuizService } from '@a-quizzes/services/modal-quiz/modal-quiz.service';
import { Question } from '@a-questions/interfaces/question';
import { QuizService } from '@a-quizzes/services/quiz/quiz.service';
import { BUTTON_TYPE } from '@a-shared/enums/buttonType';
import { SubscriptionsService } from '@a-shared/services/subscription/subscriptions.service';

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
    private subscriptionsService: SubscriptionsService
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
    this.subscriptionsService.addSubscription(
      this.quizService
        .deleteQuestion(this.quizId, this.questionIndex)
        .subscribe()
    );
  }
}
