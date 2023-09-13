import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ModalQuizService } from '../../../quizzes/services/modal-quiz/modal-quiz.service';
import { Question } from '../../interfaces/question';
import { QuizService } from '../../../quizzes/services/quiz/quiz.service';
import { BUTTON_TYPE } from '../../../shared/enums/buttonType';

@Component({
  selector: 'quiz-app-question-card',
  templateUrl: './question-card.component.html'
})
export class QuestionCardComponent implements OnDestroy {
  @Input() question: Question;
  @Input() questionIndex: number;
  @Input() quizId: string | null;

  deleteQuestionSubscription: Subscription;

  readonly BUTTON_TYPE = BUTTON_TYPE;

  constructor(
    private modalQuizService: ModalQuizService,
    private quizService: QuizService
  ) {}

  deleteQuestionConfirm(): void {
    const data: any = {
      text: 'CONFIRM_MODAL_TEXT.DELETE_QUESTION',
      buttonText: 'BUTTON.SAVE',
      questionIndex: this.questionIndex,
      quizId: this.quizId
    };
    this.modalQuizService
      .confirmDeletionModal(data)
      .onClose.subscribe((isConfirm) => {
        if (isConfirm) {
          this.deleteQuiz();
        }
      });
  }

  private deleteQuiz(): void {
    this.deleteQuestionSubscription = this.quizService
      .deleteQuestion(this.quizId, this.questionIndex)
      .subscribe();
  }

  ngOnDestroy(): void {
    if (this.deleteQuestionSubscription) {
      this.deleteQuestionSubscription.unsubscribe();
    }
  }
}
