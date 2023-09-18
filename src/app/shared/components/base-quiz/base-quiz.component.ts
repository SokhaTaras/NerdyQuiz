import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { QuizService } from '../../../quizzes/services/quiz/quiz.service';
import { Quiz } from '../../../quizzes/interfaces/quiz';
import { NavigateToService } from '../../services/navigate-to/navigate-to.service';
import { StatisticsService } from '../../services/statistics/statistics.service';
import { SubscriptionsService } from '../../services/subscription/subscriptions.service';

@Component({
  selector: 'quiz-app-quiz-details',
  template: ''
})
export class BaseQuizComponent implements OnInit {
  currentQuiz: Quiz;
  id: string | null;
  quizDifficulty: string;

  constructor(
    private statisticsService: StatisticsService,
    private quizService: QuizService,
    private route: ActivatedRoute,
    private navigateTo: NavigateToService,
    private subscriptionsService: SubscriptionsService
  ) {}

  ngOnInit(): void {
    this.getCurrentQuizId();
    this.currentQuizSubscribe();
    this.getAverageQuizDifficulty();
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

  private getAverageQuizDifficulty(): void {
    this.quizDifficulty = this.statisticsService.getAverageQuizDifficulty(
      this.currentQuiz
    );
  }
}
