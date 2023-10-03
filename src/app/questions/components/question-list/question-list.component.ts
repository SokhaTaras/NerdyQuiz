import { Component, Input } from '@angular/core';

import { Question } from '@a-questions/interfaces/question';
import { BUTTON_TYPE } from '@a-shared/enums/shared-components';
import { SubscriptionsService } from '@a-shared/services/subscription/subscriptions.service';

@Component({
  selector: 'quiz-app-question-list',
  templateUrl: './question-list.component.html',
  providers: [SubscriptionsService]
})
export class QuestionListComponent {
  @Input() quizId: string | null;
  @Input() questions: Question[];

  displayCreateQuestion = false;
  isBoolean: boolean;

  readonly BUTTON_TYPE = BUTTON_TYPE;

  toggleQuestionCreation() {
    this.displayCreateQuestion = !this.displayCreateQuestion;
  }

  showQuestionCreation(isMultiple: boolean): void {
    this.isBoolean = !isMultiple;
    this.displayCreateQuestion = true;
  }
}
