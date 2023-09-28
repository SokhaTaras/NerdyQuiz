import { Component, Input, OnInit } from '@angular/core';

import { QuizService } from '@a-quizzes/services/quiz/quiz.service';
import { Question } from '@a-questions/interfaces/question';
import {
  BUTTON_TYPE,
  defaultCategory
} from '@a-shared/enums/shared-components';
import { SubscriptionsService } from '@a-shared/services/subscription/subscriptions.service';
import { Quiz } from '@a-quizzes/interfaces/quiz';
import { QuizApiService } from '@a-quizzes/services/quiz-api/quiz-api.service';
import { mapQuestions } from '@a-shared/utils/questionsMapper';

//todo remove when modal for creating will be implemented
const DEFAULT_AMOUNT = 10;

@Component({
  selector: 'quiz-app-question-list',
  templateUrl: './question-list.component.html',
  providers: [SubscriptionsService]
})
export class QuestionListComponent implements OnInit {
  @Input() quiz: Quiz;

  displayCreateQuestion = false;
  isBoolean: boolean;
  allQuestions: Question[];

  readonly BUTTON_TYPE = BUTTON_TYPE;

  get categoryValue(): string {
    return this.quiz.category.value;
  }

  get isInvalid(): boolean {
    return this.quiz.category === defaultCategory;
  }

  constructor(
    private quizService: QuizService,
    private subscriptionService: SubscriptionsService,
    private quizApi: QuizApiService
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

  setQuestions(): void {
    const category = this.categoryValue;
    this.quizApi
      .getQuestions(DEFAULT_AMOUNT, category)
      .subscribe((questionResponse) => {
        this.allQuestions = mapQuestions(questionResponse.results);
      });
  }

  private initQuestions(): void {
    this.subscriptionService.addSubscription(
      this.quizService.quizzes$.subscribe(() => {
        return this.quizService
          .getQuizQuestions(this.quiz.id)
          .subscribe((questions) => {
            this.allQuestions = questions;
          });
      })
    );
  }
}
