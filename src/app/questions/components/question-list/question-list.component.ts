import { Component, Input } from '@angular/core';

import { Question } from '@a-questions/interfaces/question';
import { BUTTON_TYPE } from '@a-shared/enums/shared-components';
import { SubscriptionsService } from '@a-shared/services/subscription/subscriptions.service';
import { Quiz } from '@a-quizzes/interfaces/quiz';
import { ModalQuizService } from '@a-quizzes/services/modal-quiz/modal-quiz.service';
import { CreateQuestionModalData } from '@a-quizzes/interfaces/modal-data';

@Component({
  selector: 'quiz-app-question-list',
  templateUrl: './question-list.component.html',
  providers: [SubscriptionsService]
})
export class QuestionListComponent {
  @Input() quiz: Quiz;

  readonly BUTTON_TYPE = BUTTON_TYPE;

  get questions(): Question[] {
    return this.quiz?.questions;
  }

  constructor(private modalQuizService: ModalQuizService) {}

  openCreateQuestionModal(): void {
    const data: CreateQuestionModalData = {
      modalWidth: '768px',
      buttonText: 'BUTTON.NEXT',
      label: 'BUTTON.NEW_QUESTION',
      currentQuiz: this.quiz
    };

    this.modalQuizService.showCreateQuestionModal(data);
  }
}
