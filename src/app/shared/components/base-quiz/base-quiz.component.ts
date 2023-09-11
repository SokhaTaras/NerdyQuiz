import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { QuizService } from '../../../quizzes/services/quiz/quiz.service';
import { Quiz } from '../../../quizzes/interfaces/quiz';
import { NavigateToService } from '../../services/navigate-to/navigate-to.service';

@Component({
  selector: 'quiz-app-quiz-details',
  template: ''
})
export class BaseQuizComponent implements OnInit, OnDestroy {
  currentQuiz: Quiz;
  id: string | null;
  quizSubscription: Subscription;

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private navigateTo: NavigateToService
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
    this.quizSubscription = this.quizService
      .getQuizById(this.id)
      .subscribe((currentQuiz) => {
        this.currentQuiz = currentQuiz;
      });
  }

  ngOnDestroy(): void {
    this.quizSubscription.unsubscribe();
  }
}
