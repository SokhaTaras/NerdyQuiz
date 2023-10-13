import { Component, Input } from '@angular/core';

import { BUTTON_TYPE } from '@a-shared/enums/shared-components';
import { SubscriptionsService } from '@a-shared/services/subscription/subscriptions.service';
import { Quiz } from '@a-quizzes/interfaces/quiz';
import { QuizApiService } from '@a-quizzes/services/quiz-api/quiz-api.service';
import { mapQuestion } from '@a-shared/utils/questionsMapper';
import { QuizService } from '@a-quizzes/services/quiz/quiz.service';
import { Question } from '@a-questions/interfaces/question';

@Component({
  selector: 'quiz-app-question-list',
  templateUrl: './question-list.component.html',
  providers: [SubscriptionsService]
})
export class QuestionListComponent {
  @Input() quiz: Quiz;

  readonly BUTTON_TYPE = BUTTON_TYPE;

  displayCreateQuestion = false;
  isBoolean: boolean;

  get categoryValue(): string {
    return this.quiz?.category?.value;
  }

  get questions(): Question[] {
    return this.quiz?.questions;
  }

  constructor(
    private quizService: QuizService,
    private subscriptionService: SubscriptionsService,
    private quizApi: QuizApiService
  ) {}

  toggleQuestionCreation() {
    this.displayCreateQuestion = !this.displayCreateQuestion;
  }

  showQuestionCreation(isMultiple: boolean): void {
    this.isBoolean = !isMultiple;
    this.displayCreateQuestion = true;
  }

  fetchQuestions(): void {
    this.subscriptionService.addSubscription(
      this.quizApi
        .getQuestions(this.categoryValue)
        .subscribe((questionResponse) => {
          const mappedQuestion = mapQuestion(questionResponse.results[0]);

          this.quizService
            .addQuestion(this.quiz.id, mappedQuestion)
            .subscribe();
        })
    );
  }
}
