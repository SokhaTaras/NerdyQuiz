import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { QuizService } from '@a-quizzes/services/quiz/quiz.service';
import { Quiz } from '@a-quizzes/interfaces/quiz';
import { NavigateToService } from '@a-shared/services/navigate-to/navigate-to.service';
import { SubscriptionsService } from '@a-shared/services/subscription/subscriptions.service';

@Component({
  selector: 'quiz-app-quiz-details',
  template: ''
})
export class BaseQuizComponent implements OnInit {
  currentQuiz: Quiz;

  id: string | null;
  quizDifficulty: string;

  constructor(
    protected quizService: QuizService,
    private route: ActivatedRoute,
    protected navigateTo: NavigateToService,
    protected subscriptionsService: SubscriptionsService
  ) {}

  ngOnInit(): void {
    this.getCurrentQuizId();
    this.currentQuizSubscribe();
    this.quizDifficulty = this.currentQuiz.difficulty.text;
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
