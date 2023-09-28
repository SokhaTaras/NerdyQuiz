import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { QuizService } from '@a-quizzes/services/quiz/quiz.service';
import { Quiz, QUIZ_DIFFICULTY } from '@a-quizzes/interfaces/quiz';
import { NavigateToService } from '@a-shared/services/navigate-to/navigate-to.service';
import { SubscriptionsService } from '@a-shared/services/subscription/subscriptions.service';

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

  get quizDifficulty(): QUIZ_DIFFICULTY {
    return this?.currentQuiz?.difficulty;
  }

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private navigateTo: NavigateToService,
    private subscriptionsService: SubscriptionsService
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
