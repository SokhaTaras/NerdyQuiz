import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { QuizService } from '@a-quizzes/services/quiz/quiz.service';
import { Quiz } from '@a-quizzes/interfaces/quiz';
import { NavigateToService } from '@a-shared/services/navigate-to/navigate-to.service';
import { SubscriptionsService } from '@a-shared/services/subscription/subscriptions.service';
import { Question } from '@a-questions/interfaces/question';

@Component({
  selector: 'quiz-app-quiz-details',
  template: ''
})
export class BaseQuizComponent implements OnInit {
  currentQuiz: Quiz;
  id: string | null;

  get quizTitle(): string {
    return this?.currentQuiz?.title;
  }

  get quizTheme(): string {
    return this?.currentQuiz?.theme;
  }

  get quizDifficulty(): string {
    return this?.currentQuiz?.difficulty.text;
  }

  get quizQuestions(): Question[] {
    return this?.currentQuiz?.questions;
  }

  constructor(
    protected quizService: QuizService,
    private route: ActivatedRoute,
    protected navigateTo: NavigateToService,
    protected subscriptionsService: SubscriptionsService
  ) {}

  ngOnInit(): void {
    this.getCurrentQuizId();
    this.currentQuizSubscribe();
  }

  goHome(): void {
    this.navigateTo.navigateHome();
  }

  private getCurrentQuizId(): void {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  private currentQuizSubscribe(): void {
    this.subscriptionsService.addSubscription(
      this.quizService.getQuizById(this.id).subscribe((currentQuiz) => {
        this.currentQuiz = currentQuiz;
      })
    );
  }
}
