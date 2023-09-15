import { Component, Input } from '@angular/core';

import { ModalQuizService } from '../../../quizzes/services/modal-quiz/modal-quiz.service';
import { Question } from '../../interfaces/question';
import { QuizService } from '../../../quizzes/services/quiz/quiz.service';
import { BUTTON_TYPE } from '../../../shared/enums/buttonType';
import { SubscriptionsService } from '../../../shared/services/subscription/subscriptions.service';

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
      buttonText: 'LABELS.DELETE',
      questionIndex: this.questionIndex,
      quizId: this.quizId
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
      this.quizService
        .deleteQuestion(this.quizId, this.questionIndex)
        .subscribe()
    );
  }
}
