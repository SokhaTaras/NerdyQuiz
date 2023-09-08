import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { QuizService } from '../../../quizzes/services/quiz/quiz.service';
import { Question } from '../../interfaces/question';
import { BUTTON_TYPE } from '../../../shared/enums/buttonType';

@Component({
  selector: 'quiz-app-question-list',
  templateUrl: './question-list.component.html'
})
export class QuestionListComponent implements OnInit, OnDestroy {
  @Input() quizId: string | null;

  displayCreateQuestion = false;
  isBoolean: boolean;
  allQuestions: Question[];
  subscription: Subscription;

  protected readonly BUTTON_TYPE = BUTTON_TYPE;

  constructor(private quizService: QuizService) {}

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
    this.subscription = this.quizService.quizzes$.subscribe(() => {
      return this.quizService
        .getQuizQuestions(this.quizId)
        .subscribe((questions) => {
          this.allQuestions = questions;
        });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
