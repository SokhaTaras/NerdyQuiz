import { Component, Input, OnInit } from '@angular/core';

import { QuizService } from '@a-quizzes/services/quiz/quiz.service';
import { Question } from '@a-questions/interfaces/question';
import { BUTTON_TYPE } from '@a-shared/enums/buttonType';
import { SubscriptionsService } from '@a-shared/services/subscription/subscriptions.service';

@Component({
  selector: 'quiz-app-question-list',
  templateUrl: './question-list.component.html',
  providers: [SubscriptionsService]
})
export class QuestionListComponent implements OnInit {
  @Input() quizId: string | null;

  displayCreateQuestion = false;
  isBoolean: boolean;
  allQuestions: Question[];

  readonly BUTTON_TYPE = BUTTON_TYPE;

  constructor(
    private quizService: QuizService,
    private subscriptionService: SubscriptionsService
  ) {}

  ngOnInit(): void {
    this.initQuestions();
  }

  toggleQuestionCreation() {
    this.displayCreateQuestion = !this.displayCreateQuestion;
  }

  showQuestionCreation(isMultiple: boolean): void {
    this.isBoolean = !isMultiple;
    this.displayCreateQuestion = true;
  }

  private initQuestions(): void {
    this.subscriptionService.addSubscription(
      this.quizService.quizzes$.subscribe(() => {
        return this.quizService
          .getQuizQuestions(this.quizId)
          .subscribe((questions) => {
            this.allQuestions = questions;
          });
      })
    );
  }
}
