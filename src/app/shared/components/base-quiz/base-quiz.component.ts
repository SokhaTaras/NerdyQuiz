import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { QuizService } from '@a-quizzes/services/quiz/quiz.service';
import { Quiz, QUIZ_DIFFICULTY } from '@a-quizzes/interfaces/quiz';
import { NavigateToService } from '@a-shared/services/navigate-to/navigate-to.service';
import { SubscriptionsService } from '@a-shared/services/subscription/subscriptions.service';
import { Question } from '@a-questions/interfaces/question';
import { LABELS } from '@a-shared/enums/shared-components';

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

  get quizCategory(): string {
    return this?.currentQuiz?.category.text;
  }

  get quizDifficulty(): string {
    return this?.currentQuiz?.difficulty.text;
  }

  get quizQuestions(): Question[] {
    return this?.currentQuiz?.questions;
  }

  get quizDifficultyLabel(): LABELS {
    if (this.currentQuiz.difficulty.value === QUIZ_DIFFICULTY.EASY) {
      return LABELS.GREEN;
    } else if (this.currentQuiz.difficulty.value === QUIZ_DIFFICULTY.MEDIUM) {
      return LABELS.YELLOW;
    } else {
      return LABELS.RED;
    }
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
